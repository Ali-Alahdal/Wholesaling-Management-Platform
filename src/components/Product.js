// React Hooks 
import { useState , useContext, useEffect } from "react";

// Component
import QuantityCounter from "./QuantityCounter";

//MUI Component 
import { Avatar, Modal,Box } from "@mui/material";

//Contexts
import { CartProducts, Total } from "../Helpers/Context/Cart";

//Helpers and Style
import "../styles/main/Product.css"



const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "1rem",
    boxShadow: 24,
    p: 2.5,
  };

function Product(props)
{
    // Define States
    const [quantity , setQuantity] = useState(1);
    const [currentProduct , setCurrentProduct] = useState(props.data)
    const [showState,setShowState] = useState(false);

    // Define Context 
    const {currentProducts , setCurrentProducts} = useContext(CartProducts);
    const {total , setTotal} = useContext(Total);
    
    //This function to add the product to cart
    function AddProudctToCart()
    {
        // If product already exists in the cart 
        if(Array.isArray(currentProducts) && currentProducts.find((item) => item.id === currentProduct.id) !== undefined)
        {
            currentProducts.find((item) =>{
                // Increase the quantity and settle the price
                if(item.id === currentProduct.id)
                {
                    item.quantity += quantity;
                    item.price += currentProduct.price * quantity;
                   
                }
            })
        
        // if the product wasn't in cart already
        }else{
            // Add it to the cart
            setCurrentProducts([
                ...(currentProducts || []),  
                {
                    "id" : currentProduct.id,
                    "title": currentProduct.title,
                    "description": currentProduct.description,
                    "price": parseInt(currentProduct.price) * quantity ,
                    "imageUrl": props.imageUrl,
                    "quantity": quantity,
                    "supplierId" : currentProduct.supplierId,
                }
            ]);
        }
        // settle the total of order
        setTotal(total + currentProduct.price  * quantity);
       
    }


    function closeProduct(){
        setShowState(false);
    }

    return (
        <div className='product t_t_c border rounded-3 shadow position-relative col p-2 text-end' >

            {/* Image and price section */}
            <div className="position-relative h-50 mb-2 " onClick={()=>{setShowState(true)}}>     

                {/* Husam change the avatar to image please  */}
                {/* <Avatar className="position-absolute rounded-4 bg-primary-subtle rounded-bottom-0  m-auto" sx={{height:150 ,width:150}} src={props.imageUrl} alt={props.name}  variant="square" /> */}
                <img className="productImg position-absolute start-0 rounded-3 bg-primary-subtle rounded-bottom-0 w-100 h-100 m-auto" src={props.imageUrl} alt={props.name} />

                <span class="position-absolute end-0 bottom-0 dark_mode badge rounded-pill text-bg-success">{props.price + " REY"}</span>
            </div>

            {/* Name Paragraph  */}
            <p onClick={()=>{setShowState(true)}} className="d-block text-center p-2">{props.title} </p>

            {/* Counter and add to cart section */}
            <div className="d-flex justify-content-center w-100 fs-4" >

                {/* Quantity Counter Component */}
                <QuantityCounter setQuantity={setQuantity} product={props.data} imageUrl={props.imageUrl} />

                {/* Add to cart section */}
                <div className="w-50 d-flex text-center ">
        
                    <i onClick={AddProudctToCart}  class="t_bg_c bi bi-bag-plus-fill btn btn-primary rounded-5 dark_mode "></i>

                </div>
               
            </div>


            <Modal open={showState}   onClose={closeProduct}>
            <Box className={"productCard"} sx={style}>

                {/* Current image */}
                <div className="position-relative d-flex bg-primary-subtle justify-content-center mb-3 border border-2 rounded-4">
            
                    <img className="rounded-4" style={{ height: 200 }} src={props.imageUrl} />
                </div>


                <div>

                    {/* Top Secton title , price , stock quantity */}
                    <div className=" dtent-space t_t_c ">
                        
                        <div className="w-auto d-flex justify-content-between">
                            <label >{props.title}</label>
                            <label htmlFor="price">{props.price} REY</label>
                        </div>
                       
                    
                        <div className="mt-2 t_t_c d-block w-100 ">
                            
                            <textarea disabled  className="description text-center " cols={45}   rows={3} >{props.data.description}</textarea>
                     
                        </div>
                    </div>

                    {/* Counter and add to cart section */}
                    <div className="d-flex  justify-content-center w-100 fs-4">

                        {/* Quantity Counter Component */}
                        <QuantityCounter setQuantity={setQuantity} product={props.data} imageUrl={props.imageUrl} />

                        {/* Add to cart section */}
                        <div className=" d-flex text-center ">

                            <i onClick={AddProudctToCart}  class="t_bg_c bi bi-bag-plus-fill btn btn-primary rounded-5 dark_mode "></i>

                        </div>

                    </div>

                </div>

            </Box>
            </Modal>
        </div>



      
    );
}

export default Product;