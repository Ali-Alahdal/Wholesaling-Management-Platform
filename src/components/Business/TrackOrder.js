// React Hooks
import { useEffect, useState } from "react";

// Components
import EmptySection from "../Separate/EmptySection"
import BusinessOrder from "./BusinessOrder";

// Helpers
import CheckSignIn from "../../Helpers/CheckSignIn"
import FetchAPIs from "../../Helpers/FetchAPIs";
function TrackOrder() {

    // Define States
    const [currentOrders , setCurrentOrders]= useState([])
    const [decodedToken ,setDecodedToken] = useState();
    
    // Request for orders and handle it
    useEffect(()=>{
        async function fethcOrders() {
            try {
                const response = await FetchAPIs(`Order/retailer/${decodedToken.RoleId}` , "GET");
                if(!response.ok)
                {
                    throw new Error("Something went wrong!")
                }else{
                    const responseJson = await response.json();
                    if(responseJson){
                        setCurrentOrders(responseJson)
               
                        
                    }else{
                        throw new Error("Something went wrong! json")
                    }
                }
            } catch (error) {
                console.log(error);
                
            }
        }

        // if there any token
        if(decodedToken){
            fethcOrders();
        }
    },[decodedToken])


    useEffect(()=>{
        const decoded = CheckSignIn();
        if(decoded)
        {
            setDecodedToken(decoded);
        } 
        
    },[])
    
    return ( 
        <main>

            <div className='ps-5 pe-5'>

                {/* This is a block of Introduction for the page */}
                <div className='dark_mode d-flex justify-content-between shadow t_bg_c bg-gradient rounded-5 p-5'>

                    {/* Title */}
                    <div className='align-self-center '> 
                        <h1>Track Order </h1>
                    </div>

                    {/* Icon */}
                    <div>
                        <i class="dark_mode big_icons bi bi-geo-fill"></i> 
                    </div>

                </div>

                {/* Orders Section */}
                <section className='ms-3'>

                    {/* Sub title for the section */}
                    <div className=' w-100  mb-5 mt-5'>
                        <h3 className='d-block t_t_c'>Orders <i class="bi bi-arrow-right-circle-fill"></i> </h3>
                    </div>

                    {/* The Grid for Suppliers Section */}
                    <div className='gap_sm row row-cols-auto gap-5'>
                        {currentOrders.length > 0 ?  currentOrders.map((order,index)=>{
                            return(
                                <BusinessOrder key={index} order={order} />
                            );
                        }) : <EmptySection msg={"There are No Recent Orders"} />}
                        
                    </div>

                </section>

            </div>

        </main>
     );
}

export default TrackOrder;