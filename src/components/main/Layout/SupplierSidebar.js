import { Button } from "@mui/material";
import "../../../styles/main/Sidebar.css"
import SideBTN from "./Sidebar/SidebarBTN"
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import CheckSignIn from "../../../Helpers/CheckSignIn"
function SupplierSidebar()
{
   const [decodeToke,setDecodedToken] = useState();
   useEffect(()=>{
      const currentDecodedToken = () =>{
         return CheckSignIn();
      }
      if(currentDecodedToken){
         setDecodedToken(currentDecodedToken);
         console.log(decodeToke);
      }
   },[]);

   
    return (
       <>
       {/* This is a hidden div under the sidebar  */}
       <div className='hidden_sidebar h-100'></div>
       
        <aside className="sidebar position-fixed h-100">

            <div className='w-100 text-center mt-5  p-4 '>
                <h1>Logo </h1>
            </div>

            <div className='list-unstyled p-1 text-decoration-none'>
                    <li className="navList position-relative p-3">
                    <div className="side_div d-flex justify-content-start align-items-center">
                       <NavLink className="text-light pt-2 pb-1" to={"/dashboard/profile"} >
                     <i className="bi bi-person-lines-fill fs-5 ms-3 mt-2">{" "}</i>
                       Profile</NavLink>
                  </div>
                    </li>

                  {decodeToke && decodeToke.typ === "Supplier" ?  <> 
                  <div className="navList position-relative p-3">
                  <li className="side_div d-flex justify-content-start align-items-center">
                       <NavLink className="text-light pt-2" to={"/dashboard/orders"} >
                  <i className="bi bi-bag-check-fill  fs-5 ms-3 mt-2">{" "}</i>
                       Orders </NavLink>
                    </li>
                  </div>
                    <div className="navList position-relative p-3">
                    <li className="side_div d-flex justify-content: start align-items-center"> 
                       <NavLink className="text-light pt-2" to={"/dashboard/products"} >
                    <i className="bi bi-box-seam-fill  fs-5 ms-3 mt-2">{" "}</i>
                       My Products </NavLink>
                    </li>
                    </div>
             
                    
                    <div className="navList position-relative p-3">
                    <li className="side_div d-flex justify-content: start align-items-center">
                       <NavLink className="text-light pt-2" to={"/dashboard/Subscription"} >
                    <i className="bi bi-cash-stack  fs-5 ms-3 mt-2">{" "}</i>
                       Subscription </NavLink>
                    </li>
                    </div>


                   </> : 
                    <div className="navList position-relative p-3">
                     <li className="side_div d-flex justify-content: start align-items-center">
                       <NavLink className="text-light pt-2" to={"/dashboard/trackOrder"} >
                     <i className="bi bi-card-checklist  fs-5 ms-3 mt-2">{" "}</i>
                       Track Order </NavLink>
                    </li>
                    </div> }
                   
                   <div className="navList position-relative p-3">
                   <li className="side_div d-flex justify-content: start align-items-center">
                       <NavLink className="text-light pt-2" to={"/"} >
                   <i className="bi bi-house-fill  fs-5 ms-3 mt-2">{" "}</i>
                       Main Page </NavLink>
                    </li>
                   </div>
            </div>
            

            </aside>
       </>
     
      );
}







export default SupplierSidebar;