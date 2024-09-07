// React hooks and methods
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Component
import MsgBox from "../../Separate/MsgBox";
import FetchAPIs from "../../../Helpers/FetchAPIs";

// External Libleries   
import { Formik , Field,Form , ErrorMessage } from "formik";
import *  as Yup from "yup";

// Helpers
import CheckSignIn from "../../../Helpers/CheckSignIn"


import { Button } from "@mui/material";
import '../../../styles/main/Profile.css';

function Profile()
{   
    // Define methods
    const naviagte = useNavigate();
    
    // Define States
    const [account , setAccount] = useState();
    const [uploadedImage , setUploadedImage] = useState();
    const [imagePreview , setImagePreview ] = useState( ) 
    const [decodedToken ,setDecodedToken] = useState();
    
    //Define states for pop up boxes
    const [successBoxState , setSuccessBoxState ] = useState(false);
    const [errorBoxState , setErrorBoxState] = useState(false);
    
    
    //validation for Personal Informations
    const validationPersonalInformation = Yup.object({
        firstName: Yup.string().required("First Name Is Required"),
        lastName: Yup.string().required("Last Name Is Required"),
        email: Yup.string().email("Invalid Email Address").required("Email Is Required"),
        phoneNumber: Yup.string().required("Phone Is Required"),
        businessName: Yup.string().required("Business Name Is Required"),
    });

    // Validation for  address Informations
    const validationAdress = Yup.object({
        city: Yup.string().required("City is Required"),
        district: Yup.string().required("District is Required"),
        region: Yup.string().required("Region is Required"),
        street: Yup.string().required("Street is Required"),
        details: Yup.string().required("Details is Required")
    });

     // Handlers for pop up boxes
    function handleSuccessBox()
    {
        !successBoxState ? setSuccessBoxState(true) : setSuccessBoxState(false) ; 
    }
    
    function handleErrorBox()
    {
        !errorBoxState ? setErrorBoxState(true) : setErrorBoxState(false);
    }


    // Fetch Current User Data for profile and handle it
    async function fetchCurrentUser() {    
        try {
            const response = await FetchAPIs(`${decodedToken.typ}/${decodedToken.RoleId}` ,"GET");
            if(!response.ok){
                throw new Error("Something went wrong")
            }else{
                const responseJson = await response.json();
                if(responseJson){
                    setAccount(responseJson);
                    setImagePreview(responseJson.user.logoUrl);
                   
                }else{
                    throw new Error("Something went wrong");
                }
            }
        } catch (error) {
           
            handleErrorBox();
        }
    }
    
    
    // request for Update the user information function and handle it 
    async function handleSubmitAccount(form)
    {
        try {
            const response = await FetchAPIs(`${decodedToken.typ}/${decodedToken.RoleId}/Update`, "PUT", 
                {
                    ...form ,
                    logo : uploadedImage
                }
              
            ,"form-data");

            if(!response.ok)
            {
              throw new Error("Something went wrong")
            }else{
                handleSuccessBox();
            }
          
            
        } catch (error) {
            console.log(error);
            handleErrorBox();
        }
    }
     
    // request to update the user address information and handle it
    async function handleSubmitAddress(form2)
    {
        try {
            const response = await FetchAPIs(`${decodedToken.typ}/${decodedToken.RoleId}/Update`, "PUT", {
                firstName: account.user.firstName,
                lastName: account.user.lastName,
                email: account.user.email,
                phoneNumber: account.user.phoneNumber,
                businessName: account.user.businessName ,
                addresses : form2
            },"form-data");
            if(!response.ok)
            {
                throw new Error("Something went wrong");
            }else{
                handleSuccessBox()
            }
        } catch (error) {
            handleErrorBox();
        }
    }

    // Handle the image changes
    function handleImage(e)
    {
        e.preventDefault();
        setUploadedImage(e.target.files[0]);

        // Convert the local file to url so it can be viewed
        const preview = URL.createObjectURL(e.target.files[0]);
        setImagePreview(preview)
    }


    // Check if The User Logged in
    useEffect(()=>{
        const decoded = CheckSignIn();
        if(decoded)
        {
            setDecodedToken(decoded);
        }else{
            // Logout Operation
        }
    },[]);

    //if User Was logged in will start fetching data for his profile 
    useEffect(() =>{
        if(decodedToken)
        {
            fetchCurrentUser();
        }
    },[decodedToken]);

    
  
    return(

        <main>
            {/* Check if the use data has been fetched */}
            {account ? 
            <div className="text_P-bg_W pe-4 ps-5 mt-2">

                 {/* Image Section and Business Name */}
                <div className="profile_img_phone d-flex w-100 mt-5" style={{height:250}} >

                    {/* Image Section */}
                    <div className="imagePreview position-relative rounded-circle ms-5" >
                    <i className="image_bg bi bi-person-circle"></i>
                        {/* Displaying Current image for user */}
                        <img src={imagePreview} className="w-100 h-100 rounded-circle  " />

                        {/* Camera logo and input for image with handle chnages for input */}
                        <div className="position-absolute top-50 start-50 translate-middle ">
                            <label htmlFor="logo">
                                <i className="click_btn bi bi-camera-fill display-5"></i>
                            </label>
                            <input type="file"  className="d-none" name="logo"  id="logo" onChange={handleImage}  />  
                        </div>

                    </div>

                    {/* Displaying Business Name */}
                    <div className="mt-auto mb-auto me-auto ms-4"> 
                        <h1> {account.user.businessName} </h1>                    
                    </div>
                
                </div>


                {/* Title for section of personal information */}
                <div className='w-100  mb-3 mt-5'>
                    <h3 className='d-block'>Profile <i className="bi bi-arrow-right-circle-fill"></i> </h3> 
                </div>

                
                {/* Initiailizing the form and valdation schema */}
                <Formik 
                initialValues={{
                    firstName: account.user.firstName,
                    lastName: account.user.lastName,
                    email: account.user.email,
                    phoneNumber: account.user.phoneNumber,
                    businessName: account.user.businessName ,
                    }}
                validationSchema={validationPersonalInformation}
                onSubmit={(e) => handleSubmitAccount(e)} >

                    {/* Submiting state (Related to Formik Liblery) */}
                    {({isSubmitting }) => (

                    // Form to update the personal information first, last name,email,phone number, business name
                    <Form  >
                        
                        {/* Row for grid */}
                        <div className="profile_form row w-75 border rounded-5 shadow p-4 border-1">

                            {/* Every col has field and error message componet  and label */}
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <Field type="text" className="form-control rounded-5" name="firstName"   />
                                <ErrorMessage className="text-danger" name="firstName" component={"p"} />
                            </div>
                            <div className="col-md-6  mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <Field type="text" className="form-control rounded-5" name="lastName"  />
                                <ErrorMessage className="text-danger" name="lastName" component={"p"} />
                            </div>
                            <div className="col-12  mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <Field type="email" className="form-control rounded-5" name="email" disabled />
                                <ErrorMessage className="text-danger" name="email" component={"p"} />
                            </div>
                            <div className="col-12  mb-3">
                                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                <Field  type="text" className="form-control rounded-5" name="phoneNumber"  />
                                <ErrorMessage className="text-danger" name="phoneNumber" component={"p"} />
                            </div>
                            <div className="col-12  mb-3">
                                <label htmlFor="businessName" className="form-label">Business Name</label>
                                <Field type="text" className="form-control rounded-5" name="businessName"   />
                                <ErrorMessage className="text-danger" name="businessName" component={"p"} />
                            </div>
                            <button type="submit" disabled={isSubmitting}  className='submit_btn mt-3 ms-3 w-25 t_bg_c bg-gradient shadow text-light border-0 p-2 ps-3 pe-3 rounded-5' >Save</button>
                              
                        </div>

                        {/* Button for submiting */}

                    </Form>
                    )}
                </Formik>

                
                {/* Title for section of address information */}
                <div className=' w-100  mb-4 mt-5'>
                        <h3 className='d-block  '>Address Information <i className="bi bi-arrow-right-circle-fill"></i> </h3> 
                </div>
                
                {/* Initiailizing the form and valdation schema */}
                <Formik  
                initialValues={ account.user.addresses ? {
                   
                    city : account.user.addresses.city ? account.user.addresses.city : "" ,
                    district : account.user.addresses.district ? account.user.addresses.district : "",
                    region: account.user.addresses.region ? account.user.addresses.region : "d",
                    street: account.user.addresses.street ? account.user.addresses.street : "",
                    details :account.user.addresses.details ? account.user.addresses.details : ""
                    
                }: {
                    city :  "" ,
                    district :  "",
                    region: "",
                    street: "",
                    details :""
                }} 
                validationSchema={validationAdress}
                onSubmit={(e) => handleSubmitAddress(e)}>

                    {/* Submiting state (Related to Formik Liblery) */}
                    {({isSubmitting}) => (
                    
                    // Form to update the address information city , district, region, stresst,details 
                    <Form>

                        {/* Row for grid */}
                        <div className="profile_form row w-75 border rounded-5 shadow p-4 border-1">

                            {/* Every col has field and error message componet  and label */}
                            <div className="col-md-6">
                                <label for="city" className="form-label">City</label>
                                <Field type="text" className="form-control rounded-5" name="city"  />
                                <ErrorMessage className="text-danger" name="city" component={"p"} />
                            </div>
                            <div className="col-md-6  ">
                                <label for="district" className="form-label">District</label>
                                <Field type="text" className="form-control rounded-5" name="district"  />
                                <ErrorMessage className="text-danger" name="district" component={"p"} />
                            </div>
                            <div className="col-12  mb-3">
                                <label for="region" className="form-label">Region</label>
                                <Field type="text" className="form-control rounded-5" name="region"  />
                                <ErrorMessage className="text-danger" name="region" component={"p"} />
                            </div>
                            <div className="col-12  mb-3">
                                <label for="street" className="form-label">Street</label>
                                <Field type="text" className="form-control rounded-5" name="street"  />
                                <ErrorMessage className="text-danger" name="street" component={"p"} />
                            </div>
                            <div className="col-12  mb-3">
                                <label for="details" className="form-label">Details</label>
                                <Field type="text" className="form-control rounded-5" name="details"  />
                                <ErrorMessage className="text-danger" name="details" component={"p"} />
                            </div>
                        
                        <button type="submit" disabled={isSubmitting}  className='submit_btn mt-3 ms-3 p-2 ps-3 pe-3 w-25 t_bg_c bg-gradient text-light border-0 shadow rounded-5'>Save</button>
                        </div>
                        
                        {/* Button for submiting */}
                    </Form>
                    ) }
                </Formik>
                
            </div>
            : null}

            {/* success and failed pop uo boxes */}
            <MsgBox msg={"Your information has been updated successfully"} open={successBoxState} close={handleSuccessBox} icon={"bi bi-check2 text-success"} />
            <MsgBox msg={"Something went wrong"} open={errorBoxState} close={handleErrorBox} icon={"bi bi-x-lg text-danger"} />
        </main>

    );
}


export default Profile;