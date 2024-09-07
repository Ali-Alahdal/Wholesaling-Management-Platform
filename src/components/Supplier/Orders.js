// React hooks and methods
import { useEffect, useState } from "react";

// Components
import SupplierOrder from "./SupplierOrder";
import EmptySection from "../Separate/EmptySection"


// Helpers
import FetchAPIs from "../../Helpers/FetchAPIs";
import CheckSignIn from "../../Helpers/CheckSignIn"

function Orders(){

    // Define States
    const [decodedToken , setDecodedToken] = useState();
    const [currentOrders,setCurrentOrders] = useState([]); 


    // Request for the current supplier orders and handle it
    useEffect(()=>{
        async function fetchOrders() {
            try {
                const response =  await FetchAPIs(`Order/supplier/${decodedToken.RoleId}`);
                if(!response.ok){
                    throw new Error("Something went wrong");
                }else{
                    const responseJson = await response.json();
                    if(responseJson){
                        setCurrentOrders(responseJson)
                        console.log(responseJson);
                        
                    }else{
                        throw new Error("Something went wrong");
                    }
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        
        // In Case Token Found
        if(decodedToken){
            fetchOrders();
        }
    },[decodedToken])
    
    // Check if the user logged in
    useEffect(()=>{
        const decoded = CheckSignIn();
        if(decoded){
            setDecodedToken(decoded);
        }else{
            // Logout Prosses
        }
    },[])
    
   
    return(
        <div className='main_div ms-5 me-5'>


            {/* This is a block of Introduction for the page */}
            <div className='dark_mode d-flex justify-content-between shadow t_bg_c bg-gradient rounded-5 p-5'>

                <div className='align-self-center '> 
                    <h1>Orders</h1>
                </div>
                <div>
                    {/* Icon */}
                    <i class="dark_mode big_icons bi bi-bag-fill"></i> 
                </div>

            </div>
            
            {/* Orders Section */}
            <div className=" pe-4 ps-4 ">
                
                <div className=' w-100  mt-5 mb-5'>
                    <h3 className='d-block t_t_c'>All Orders <i className="bi bi-arrow-right-circle-fill"></i> </h3>
                </div>
                {/* Gird for the orders */}
                <div className="gap_sm row row-cols-auto gap-5">

                {/* Mapping order if there any of them  */}
                { currentOrders.length > 0 ? 
                    currentOrders.map((order,index) =>{
                     return   <SupplierOrder key={index} order={order} /> ;
                    })
                
                :<EmptySection msg={"You didn't recive any orders recently"} />}
                </div>

            </div>
            
        </div>
    );
}

export default Orders;