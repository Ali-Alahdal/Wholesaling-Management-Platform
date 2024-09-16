// React hooks
import { useContext } from "react";

// Contexts
import { CartProducts , Total} from "../Helpers/Context/Cart";


function ProductInCart(props)
{
    // Define Contexts
    const {total,setTotal} = useContext(Total);
    const {currentProducts ,setCurrentProducts} = useContext(CartProducts);

    return(
        // The product in cart div contains the image, name, price, amount, ablitiy to delete it from cart
        <div  className="position-relative d-flex border shadow rounded-3 p-2 align-items-center mb-3 dark_border">

            {/* Product Image */}
            <div className=" d-inline me-2"> 
                <img src={props.imageUrl}  width={50}  height={50} />
            </div>

            {/* The div for product detials */}
            <div className="d-block ms-1   "> 
                <div> {props.title} <span className=" t_sub_c ms-2 ps-1 pe-1 rounded-5">{props.quantity}</span> </div>
                <div className="btn btn-success rounded-5 dark_mode mt-2 pt-0 pb-0"> {props.price} $</div>
            </div>

            {/* The trash div */}
            <div className="position-absolute end-0 me-2 " > 
                
                {/* The icon */}
                <i onClick={() => {
                    // if Clicked
                    // Filtering the products so we can delete the product from the cart 
                    setCurrentProducts((currentProducts || []).filter(item2 => item2.id !== props.id));
                    //Updating The Total  
                    setTotal(total - props.price);

                }} class=" text-danger bi bi-trash-fill fs-4"></i> 

            </div>

      </div>   
    );
}

export default ProductInCart;
