// React Hooks
import { useEffect, useState } from "react";


function BusinessOrder(props) {
    const [currentOrder,setCurrentOrder] = useState(props.order);
   
 
    
    return (  
        <div className="t_t_c w-auto h-100 border border-2 rounded-4 dark_border">

            {/* Upper Section order details */}
            <div className="d-flex justify-content-between mt-4 ms-2">

                {/* Order id, date  */}
                <div>
                    <h2>  Order ID : #{currentOrder.orderId} </h2>
                    <h6>Order Date : {currentOrder.orderDate.toString().split("T")[0]}</h6>
                </div>

                {/* Order Status */}
                <div className="d-flex mt-auto mb-auto me-3 dark_mode">
                    <p className="bg-warning p-2 rounded-pill">{currentOrder.state}</p>
                </div>

            </div>

            {/* Gray Line  */}
            <hr/>

            {/* Mapping Order Products if there any  */}
            {currentOrder.items.map((order ,index )=>{

                const product = order.product;
                return(      
                    <div key={index}  className="w-100 d-flex justify-content-between mb-3 t_t_c">

                        <div className=" d-flex" >

                            <img src={product.viewImage} className="bg-primary-subtle rounded-3 productImg" style={{width:120,height:120}}/>
                            <div className="mt-auto mb-auto ms-2">
                                <h5>{product.title} </h5>
                                <div>{product.description}</div>
                            </div>

                        </div>

                        <div className="mt-auto mb-auto me-3">
                            <div>Price : {order.total}</div>
                            <div>Quantity: {order.quantity}</div>
                        </div>
                    </div>
                );                
                 
               
                     
            })}

            {/* Gray Line  */}
            <hr/>

            <div className="total_order m-3 d-flex align-items-center dark_mode bg-secondary rounded-5 p-1 ps-3" style={{width: "130px"}}>
            Total:
                <div className="bg-success m-0 p-2 ms-2 rounded-pill"> {currentOrder.totalDeal}</div>
            </div>
        
          
        </div>
    );
}

export default BusinessOrder;