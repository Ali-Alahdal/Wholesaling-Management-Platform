// React Hooks
import {  useEffect, useState } from "react";

// Component
import MsgBox from "../Separate/MsgBox";

// Helpers
import FetchAPIs from "../../Helpers/FetchAPIs";

function SupplierOrder(props)
{
    //Define States    
    const [currentOrder , setCurrentOrder] = useState(props.order);
    const [orderProducts, setOrderProducts] = useState(props.order.items);
    const [retailerAddress , setRetailerAddress] = useState(props.order.retailer.retailerAddress);

    // States related to status chnages
    const [currentStatus , setCurrentStatus] = useState(props.order.state)
    const [currentStatusColor , setCurrentStatusColor]  = useState("");
    

    // Define state for pop up boxes
    const [successBoxState , setSuccessBoxState ] = useState(false);
    const [errorBoxState , setErrorBoxState] = useState(false);


    // Handlers for pop up boxes
    function handleSuccessBox()
    {
        !successBoxState ? setSuccessBoxState(true) : setSuccessBoxState(false) ; 
    }
    
    function handleErrorBox()
    {
        !errorBoxState ? setErrorBoxState(true) : setErrorBoxState(false);
    }

    // Handle the changes that's happen to the selet list and change the color
    function handleStatusChanges(e)
    {
        const value = e.target.value;

        setCurrentStatus(value);
             
    }
    
    // Request to update the status of order and handle it
    async function updateStatus() {
        try {
            console.log({
                orderId : currentOrder.orderId,
                state : currentStatus
            });
            
            const response = await FetchAPIs(`Order/UpdateState?orderId=${currentOrder.orderId}&state=${currentStatus}`,"PUT" , null,"",false);
            console.log(response);
            
            if(!response.ok)
            {
                throw new Error("Something went wrong");
            }else{
                handleSuccessBox();
            }
        } catch (error) {
            handleErrorBox();
        }
    }

    return (
        // Col or the grid
        <div className="text-dark w-100 h-100 border border-2 rounded-4 dark_border">

            {/* Top Section contains (id , date,status) */}
            <div className="d-flex justify-content-between mt-4 ms-2 ">

                {/* Date and Id */}
                <div className="mt-2">
                    <h2>Retailer : {currentOrder.retailer.businessName}  </h2>
                    <h4>Order ID : #{currentOrder.orderId}</h4>
                    <h6>Order Date :{currentOrder.orderDate.toString().split("T")[0]}</h6>
                </div>

                {/* Status setCurrentStatusColor(e.target.classList)*/}
                <div className="mt-4">

                    <select className={ "text-dark p-2  bg-primary-subtle rounded-pill border-0 text-center" } onChange={handleStatusChanges} value={currentStatus}  >
                        <option  value={"pending"}>pending</option>
                        <option  value={"processed"}>processed</option>
                        <option  className="text-dark" value={"delivered"}>delivered </option>
                        <option  className="bg-danger dark_mode" value={"canceled"}>canceled</option>
                    </select>

                </div>

            </div>

            {/* Gray Line */}
            <hr/>

            {/* Row to grid the products in order  */}
            <div className="row row-cols-1 gy-3" style={{height:"auto"}} >

                {/* if there any product in the order map them */}
                {orderProducts.length > 0 ? orderProducts.map((product,index) =>{

                    // Assgin innerProduct so we DRY
                    const innerProduct = product.product;

                    return(
                        // Column for grid
                        <div className="col w-100  d-flex justify-content-between " style={{height:"110px"}}>

                            {/* The left section contains image , title , description */}
                            <div className="d-flex flex-1 w-50">

                                {/* Image */}
                                <div className="w-50">
                                    <img src={innerProduct.viewImage} className=" w-100" />
                                </div>

                                {/* Title , description */}
                                <div className="w-50 ms-3 mt-auto mb-auto">
                                    <h4> {innerProduct.title} </h4>
                                    <h6>{innerProduct.description}</h6>
                                </div>

                            </div>

                            {/* Right section contains price and anmout of ordered product */}
                            <div className="mt-auto mb-auto me-4">
                                <p className="m-0 bg-success rounded-5 text-center dark_mode p-2">price : {product.total} REY</p>
                                <p className="m-0 p-2">Amount : {product.quantity}  </p>
                            </div>

                        </div>
                     );
                     
                })
                    
                : null} 
            </div>

            {/* Order Total Price  */}
            <div className="bg-secondary dark_mode  p-2 rounded-5 mt-5 "  style={{maxWidth:"150px",width:"auto"}}>
                Total : <span className="bg-success p-1  rounded-5  p-2">{currentOrder.totalDeal} REY</span>
            </div>

            {/* Gray line */}
            <hr/>
            
            {/* Bottom Section */}
            <div className="w-100 d-flex  justify-content-between">

                {/* Address Section */}
                <div className="w-50 text-center">
                    <h6>Retailer Address : </h6>

                    {retailerAddress ? 
                        <> 
                            {/* Lines to display retailer address */}

                            {retailerAddress.city + " - " + retailerAddress.district } <br/>

                            { retailerAddress.region + " - " + retailerAddress.street} <br/>
                            
                            {retailerAddress.details}
                        
                        </>
                    : null}
                  
                </div>
                
                {/* Reatiler Phone Number Section */}
                <div className="w-50 text-center">

                    <h6>Phone number : </h6>
                    {currentOrder.retailer.retailerPhoneNumber}    

                </div>
              
            </div>

            {/* Button to update state */}
            <div className="text-start">
                    <button onClick={updateStatus} className="border-0 shadow bg-primary p-2 ps-4 pe-4 rounded-5 mb-3 dark_mode "> Save </button>
            </div>
            
            {/* success and failed pop uo boxes */}
            <MsgBox msg={"Your product has been added successfully"} open={successBoxState} close={handleSuccessBox} icon={"bi bi-check2 text-success"} />
            <MsgBox msg={"Something went wrong"} open={errorBoxState} close={handleErrorBox} icon={"bi bi-x-lg text-danger"} />           
        </div>
    );
}

export default SupplierOrder;