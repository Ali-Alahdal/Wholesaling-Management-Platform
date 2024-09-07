// React hooks
import { useEffect, useState } from "react";

function QuantityCounter(props)
{

    // Define states
    const [currentCount,setCuurentCount] = useState(1);
  
    // settle the count to be more then 0
    useEffect(() =>{
        currentCount <= 1 ? setCuurentCount(1) : setCuurentCount(currentCount); 
    });

    // Lift up the state using props to set quantity for product
    useEffect(() =>{
        props.setQuantity(currentCount); 
    },[currentCount])

    return(
        <div className="d-flex align-items-center me-1 fs-5 ps-2 pe-2" >

            {/* Increase and decrease the quantity  */}
            <i class="bi bi-plus-circle t_t_c p-0" onClick={() =>{ setCuurentCount(currentCount + 1); ; }} ></i>
            {/* displaying the the current count for quantity */}
            <span className=" user-select-none ms-2 me-2">{currentCount} </span>

            <i class="bi bi-dash-circle t_t_c " onClick={() =>{ setCuurentCount(currentCount - 1); ; } } ></i>
        </div> 
    );
}

export default QuantityCounter;