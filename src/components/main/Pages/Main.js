//react hooks
import { useState,useEffect, useContext  } from 'react';

//Components
import RoundedImage from './ImageComponents/RoundedImage';
import SqureImage from './ImageComponents/SquareImage';
import SigninForm from '../../Separate/SigninForm';
import SignupForm from '../../Separate/SignupForm'
import MsgBox from '../../Separate/MsgBox';
import EmptySection from '../../Separate/EmptySection';

//Helpers
import FetchAPIs from '../../../Helpers/FetchAPIs';
import Cookies from 'js-cookie';
import { IsLogged } from '../../../Helpers/Context/Account';
import CheckSignIn from '../../../Helpers/CheckSignIn';

//Style
import "../../../styles/main/Page.css"


 

function Main(){

   //Define States.
   const [categories,setCategories] = useState([]);
   const [suppliers,setSuppliers] = useState([]);

   //Define States For Pop up Boxes
   const [signUpBoxState , setSignUpBoxState] = useState(false);

   //Define Contexts.
   const {isLoggedIn , setIsLoggedIn } = useContext(IsLogged);

   

   //Handlers for Pop up Boxes (Open or Close)
   function handleSignUpBox()
   {
      !signUpBoxState ? setSignUpBoxState(true) :  setSignUpBoxState(false);
   }


 


   //Use Effect That wil be used to after the page rendered to fetch the data .
   useEffect(() =>{
      
      // Categories Fetching
      async function fetchCategories ()
      {  
         const response = await FetchAPIs("category/all");
         const responseJson = await response.json();
         setCategories(responseJson);
        
      }
      

      //Supplier Fetching
      async function fetchSuppliers()
      {
         const response = await FetchAPIs("supplier/all");
         const responseJson = await response.json();
         setSuppliers(responseJson);
      }

      
      //Call Funcations
      fetchCategories();
      fetchSuppliers();
    
   },[])

   
   

   return (
      <main>

         {/* Here's The Content Of The Page  */}
         <div className='main_div ms-5 me-5'>

            {/* This is a block of Introduction for the page  ...............*/}
            <div className='dark_mode d-flex justify-content-between shadow t_bg_c bg-gradient rounded-5 p-5  '>

               {/* Title For The Page */}
               <div className='align-self-center'> 
                  <h1>Main Page</h1>
               </div>

               {/* Home Icon */}
               <div>
                 <i className="dark_mode big_icons bi bi-house-fill  "></i> 
               </div>

            </div>

            {/* Sgin in and Sgin Up Section ............. */}
            <section className='text-center mt-5 mb-4 '>
                  { !isLoggedIn  ?

                  <div> 
                     
                     {/* Sign In Form As a Component */}
                     <SigninForm />

                     {/* Button To Handle Message Box */}
                     <span  className='dark_mode sign_btn ps-4 pe-4 pt-2 pb-2 border-0 bg-gradient shadow rounded-5 t_bg_c' onClick={handleSignUpBox} >Sign up</span>

                     {/* a Message To Choose Between Supplier Or Retailer To Sign Up */}
                     <MsgBox open={signUpBoxState} close={handleSignUpBox} msg={ 

                     // Msg Content 
                     <div> 

                        <p className='mb-4'>You Want To Sign up as  Supplier or  Business </p> 
         
                        {/* Supplier Sign Up Form */}
                        <SignupForm button={"Supplier"} color={"signup_box_btn bg-gradient me-3 p-2 ps-3 pe-3"} url={"Supplier"}  />

                        {/* Retailer Sign Up Form */}
                        <SignupForm button={"Retailer"} url={"Retailer"} color={"signup_box_btn bg-gradient p-2 ps-3 pe-3"} />

                     </div>  }  />
                  
                  </div>  
                        
                  : null }
   
            </section>


            {/* Categories Section ........... */}
            <section className='ms-3'>

               {/* Sub title for the section */}
               <div className=' w-100  mb-5'>
                   <h3 className='d-block t_t_c'>Categories <i className="bi bi-arrow-right-circle-fill"></i> </h3>
               </div>

               {/* The Grid for Categories Section */}
               <div className='gap_sm row row-cols-auto gap-5 justify-content-center'>
                  
                  {categories.length > 0  ? categories.map((category,index) => {
                     return( 
                        <RoundedImage  key={index} toWhere={"/category/" + category.id} data={category}  image={category.imageUrl} name={category.name}  />
                     ); 
                  }) : <EmptySection msg={"There are No Categories Now, We're Sorry"} /> }
               
               </div>

            </section>

            {/* Suppliers Section ........... */}      
            <section className='ms-3'>
                  
               {/* Sub title for the section */}
               <div className=' w-100  mb-5 mt-5'>
                     <h3 className='d-block t_t_c'>Suppliers <i className="bi bi-arrow-right-circle-fill align-self-center"></i> </h3>
               </div>

               {/* The Grid for Categories Section */}
               <div className='gap_sm row row-cols-auto gap-5 justify-content-center '> 

                  {suppliers.length > 0 ? suppliers.map((supplier,index) => {
                     const user = supplier.user;
                     return(
                        <SqureImage key={index} toWhere={'/supplier/' + user.businessName} data={supplier}  imageUrl={user.logoUrl} name={user.businessName}  />
                     );
                     
                  }) : <EmptySection msg={"There are No Suppliers Now, We're Sorry"} />}
                  
               </div>

            </section>
       
         </div>

      </main>
   );
}

export default Main;