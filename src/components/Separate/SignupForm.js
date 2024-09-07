// This Sign Up Form Component For Both of Supplier and Retailer 
// It's Depend on Props Either Supplier or Retailer  




//React Hooks
import {  useContext, useState } from "react";

//Components
import MsgBox from "./MsgBox";


//MUI Components
import { Modal , Box  } from "@mui/material";


//Helpers
import { Form , Formik , Field , ErrorMessage } from "formik";
import * as Yup from "yup"
import Cookies from "js-cookie";
import { IsLogged } from "../../Helpers/Context/Account";

import FetchAPIs from "../../Helpers/FetchAPIs";




//Style for the Pop up Box 
const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
};



function SignupForm(props){

    //Define Context
    const {setIsLoggedIn} = useContext(IsLogged);
    //Define States 
    const [msg,setMsg] = useState("");

    //Define States for Pop up Boxes 
    const [signUpBoxState , setSignUpBoxState] = useState(false);
    const [errorBoxState , setErrorBoxState] = useState(false);


    //Validation Schema For The Form
    const formValidation = Yup.object({
        FirstName : Yup.string().min(2).required("This Field is Required"),
        LastName : Yup.string().min(2).required("This Field is Required"),
        Email : Yup.string().email().required("This Field is Required"),
        Password : Yup.string().min(5,"Enter More then 5 Characters")
            .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
            .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
            .matches(/^(?=.*[0-9])/, 'Must contain at least one number').required("This Field is Requred"),   
        PhoneNumber : Yup.string().min(6).required("This Field is Required"),
        BusinessName : Yup.string().min(3).required("This Field is Required")
    })
   

   
    //Handlers for Pop up Boxes (Open or Close)
    //if the state is false will be assigned to true and vice versa
    function handleSignUpBox()
    {
        !signUpBoxState ? setSignUpBoxState(true) :  setSignUpBoxState(false);
    }

    function handleErrorBox()
    {
        !errorBoxState ? setErrorBoxState(true) : setErrorBoxState(false);
    }

  
    //Function To Send Request to The Server To Register The New User 
    async function handleSubmit (content){
       
        //Try to register the new user and catch any error may happen
        try {

            //Send The Request Using FetchAPI Script
            //The Form To Send is (end point , method , content , type  , is Object)
            //ُEnd point could be chnaged based on passed props
            const response = await FetchAPIs(`Account/Register/${props.url}` , "POST" , content,"form-data" , false);
         
            //If the response from the server wasn't ok it will throw new error    
            if(!response.ok){            
                throw new Error("Error With APIs Happened!")
            }else{
                
                //Save The Token and Change the login state to true if everything was ok
                const responseJson = await response.json();  
                Cookies.set("token" , responseJson.token , {expires : 1});
                setIsLoggedIn(true);
                window.location.reload();
            
            }
            
        } catch (error) {
            //Catch The Error and Display it
            setMsg("You Email Has Been Already Taken or an Error Happened!");
            handleErrorBox();
        }
    }

    
    return (
        <>


        {/* Button To Choose Between Retailer or Suplier depending on Props */}
        <span onClick={handleSignUpBox} className={"p-2 border-0 rounded-5 " + props.color} > {props.button} </span>


        {/*This modal is hidden until some one click the button above */}
        <Modal open={signUpBoxState} onClose={handleSignUpBox} >
            <Box className="sign_form rounded-4 border" sx={style}>

                {/* Initialzing the form by initial values and passing validation schema and listener for submit event  */}
                <Formik 
                    initialValues={{
                        FirstName : "",
                        LastName :  "",
                        Email : "",
                        Password :  "",
                        PhoneNumber :  "",
                        BusinessName :  ""
                    }} 
                    validationSchema={formValidation}
                    onSubmit={(e) => handleSubmit(e)} >
                    
                    {/* Submit State (something related to Formik liblery ) */}
                    {({isSubmitting}) => (

                    // The Form contains row for grid  every div is col  contains an input with the error message and the label
                    <Form>
                        <div className="row">

                            <div className="col-md-6 mb-0 mt-0">
                                <label for="inputEmail4" className="form-label">First Name</label>
                                <Field type="text" className="form-control rounded-5" name="FirstName" />
                                <ErrorMessage className="text-danger mt-0 mb-0 "  name="FirstName" component={"p"} /> 
                            </div>
                            <div className="col-md-6 mt-0 mb-0">
                                <label for="inputPassword4" className="form-label">Last Name</label>
                                <Field type="text" className="form-control rounded-5" name="LastName" />
                                <ErrorMessage className="text-danger mt-0 mb-0"  name="LastName" component={"p"} /> 
                            </div>
                            <div className="col-12 mt-0 mb-0">
                                <label for="inputAddress" className="form-label">Email</label>
                                <Field type="email" className="form-control rounded-5" name="Email"  />
                                <ErrorMessage className="text-danger mt-0 mb-0"  name="Email" component={"p"} /> 
                            </div>
                            <div className="col-12 mt-0 mb-0">
                                <label for="inputAddress2" className="form-label">Phone Number</label>
                                <Field type="text" className="form-control rounded-5" name="PhoneNumber"  />
                                <ErrorMessage className="text-danger mt-0 mb-0"  name="PhoneNumber" component={"p"} /> 
                            </div>
                            <div className="col-12 mt-0 mb-0">
                                <label for="inputAddress2" className="form-label">Business Name</label>
                                <Field type="text" class="form-control rounded-5" name="BusinessName"  />
                                <ErrorMessage className="text-danger mt-0 mb-0"  name="BusinessName" component={"p"} /> 
                            </div>
                            <div className="col-12 mt-0 mb-0">
                                <label for="inputAddress2" className="form-label">Password</label>
                                <Field type="password" className="form-control rounded-5" name="Password"  />
                                <ErrorMessage className="text-danger mt-0 mb-0"  name="Password" component={"p"} /> 
                            </div>
                        </div>

                        {/* Button For Submitation */}
                        <button type="submit" disabled={isSubmitting} className='sign_form_submit me-4 mt-3 border-0 rounded-5 p-2 bg-primary' >Submit</button>

                    </Form>
                )}  
                
                </Formik>

            </Box>
    </Modal>

    {/* Error Messages is Hidden until Something Error Happen */}
    <MsgBox msg={msg} open={errorBoxState} close={handleErrorBox} icon={"bi bi-x-circle-fill text-danger"} />
    
     </>
    );
}



export default SignupForm;