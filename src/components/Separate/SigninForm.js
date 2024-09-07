// React Hooks
import { useState , useContext } from "react";

// Components
import MsgBox from "./MsgBox";

// MUI Components
import { Modal , Box} from "@mui/material";


// Helpers
import * as Yup from "yup"
import { Formik , Form , Field, ErrorMessage } from "formik";
import FetchAPIs from "../../Helpers/FetchAPIs";
import { IsLogged } from "../../Helpers/Context/Account";
import Cookies from "js-cookie";



//Style for the Pop up Box 
const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius:'2rem',
    boxShadow: 24,
    p: 4,
};




function SigninForm()
{
   
    // Define Context
    const {setIsLoggedIn} = useContext(IsLogged);

    // Define states
    const [msg , setMsg] = useState("");

    // Define states for Pop Up Boxes 
    const [signInBoxState,setSignInBoxState] = useState(false);
    const [errorBoxState , setErrorBoxState] = useState(false);

    
     //Validation Schema For The Form
    const formValidation = Yup.object({
        email : Yup.string().email().required("This Field is Requred"),
        password : Yup.string().min(5)
        .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
        .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
        .matches(/^(?=.*[0-9])/, 'Must contain at least one number').
        required("This Field is Requred")
    })
  
 
    //Handlers for Pop Up Boxes
    function handleSignInBox()
    {
        !signInBoxState ? setSignInBoxState(true) : setSignInBoxState(false);
    }

    function handleErrorBox()
    {
        !errorBoxState ? setErrorBoxState(true) : setErrorBoxState(false);
    }

    // When ever the form be submited
    async function handleSubmit(content) {

    
        //Try to login the  user and catch any error may happen
        try {
            //Send The Request Using FetchAPI Script
            const response = await FetchAPIs("Account/Login" , "POST" , content , "",false);
            console.log(response );
            
             //If the response from the server wasn't ok it will throw new error  
            if(!response.ok){
                throw new Error("Email Or Password is Not Vaild!")
            }else{
                //Save The Token and Change the login state to true if everything was ok
                const responseJson = await response.json();  
                if( responseJson.token)
                {
                    Cookies.set("token" , responseJson.token , {expires : 1});
                    setIsLoggedIn(true);
                    window.location.reload();
                }else{
                    throw new Error("Email Or Password is Not Vaild or User Has Been Deleted!")
                }
                
            }
        } catch {

            //Catch The Error and Display it
            setMsg("Email Or Password is Not Vaild!");
            handleErrorBox();
        }
    }    

    return(
        <>
            {/* Button To Active The Hidden Form */}
            <span  className='dark_mode sign_btn ps-4 pe-4 pt-2 pb-2 border-0 shadow bg-gradient rounded-5 t_bg_c me-5 ' onClick={handleSignInBox} >Sign In</span>  

            {/*This modal is hidden until some one click the button above */}
            <Modal open={signInBoxState} onClose={handleSignInBox} >
                <Box className="sign_form rounded-4 border" sx={style}>

                    {/* Initialzing the form by initial values and passing validation schema and listener for submit event  */}
                    <Formik initialValues={{
                        email : "",
                        password : ""
                    }}
                    validationSchema={formValidation}
                    onSubmit={(e) =>{handleSubmit(e)}}
                    >

                     {/* Submit State (something related to Formik liblery ) */}
                    {({isSubmiting}) =>(
                        // The Form ,  every div contains an input with the error message and the label
                        <Form >
                            <div>
                                <label for="email" className="form-label">Email </label>
                                <Field type="email" className="form-control rounded-5" placeholder='Email' name='email' />

                                {/* Simple note for email input */}
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                <ErrorMessage className="text-danger" name="email" component={"p"} />
                            </div>
                            <div>
                                <label for="password" className="form-label">Password</label>
                                <Field type="password" className="form-control rounded-5" placeholder='password' name='password'  />
                                <ErrorMessage className="text-danger" name="password" component={"p"} />
                            </div>
                            <button disabled={isSubmiting} type='submit'  className='sign_form_submit mt-3 me-4 t_bg_c border-0 rounded-5 p-2' >Sign in</button>
                        </Form>
                    )}

                    </Formik>

                </Box>
            </Modal>
            
            {/* The Hidden Error Message  */}
            <MsgBox msg={msg} open={errorBoxState} close={handleErrorBox} icon={"bi bi-x-circle-fill text-danger"} />
        </>
    );
}


export default SigninForm;