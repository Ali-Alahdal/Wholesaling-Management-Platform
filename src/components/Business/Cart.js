//React Hooks
import { useState , useContext, useEffect } from "react";


//Components
import ProductInCart from "../ProductInCart";
import ConfirmationMsg from "../Separate/ConfirmationMsg";
import EmptySection from "../Separate/EmptySection";
import MsgBox from "../Separate/MsgBox";

//MUI Components
import { Modal , Box } from "@mui/material";

//Contexts
import { Total , CartProducts } from "../../Helpers/Context/Cart";

// Helpers
import FetchAPIs from "../../Helpers/FetchAPIs";
import CheckSignIn from "../../Helpers/CheckSignIn"
import { IsLogged } from "../../Helpers/Context/Account";

// style for the pop up box
const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    p: 2,
  };
function Cart() {


    // Define State
    const [role , setRole] = useState("");
    const [retialerId , setRetailerId] = useState(0);
    
    
    //Define Contexts
    const {currentProducts } = useContext(CartProducts);
    const {total , setTotal} = useContext(Total);
    const {isLoggedIn} = useContext(IsLogged);
    //Define states for pop up boxes
    const [cartBoxState , setCartBoxState] = useState(false);
    const [confirmationBoxState , setConfirmationBoxState] = useState(false);
    const [successBoxState , setSuccessBoxState ] = useState(false);
    const [errorBoxState , setErrorBoxState] = useState(false);
    
  
    // Handlers for pop up boxes
    function handleCartBox()
    {
        !cartBoxState ? setCartBoxState(true) : setCartBoxState(false);
    }

    function handleConfirmationBox()
    {
        !confirmationBoxState ? setConfirmationBoxState(true) : setConfirmationBoxState(false);
    }

    function handleSuccessBox()
    {
        !successBoxState ? setSuccessBoxState(true) : setSuccessBoxState(false) ; 
    }
    
    function handleErrorBox()
    {
        !errorBoxState ? setErrorBoxState(true) : setErrorBoxState(false);
    }

    // Function to make order
    async function makeOrder() {
        const time =  new Date();
        console.log(`${time.getFullYear()}-${time.getMonth()}-${time.getDay()}` );
        try {
            // Post data to server (Back-end apis)
            const response = await FetchAPIs("order/add" , "POST" , {
                retailerId : retialerId,
                orderDate : time.toJSON(),
                items : 
                    currentProducts.map((product ) =>{
                        return {
                            productId : product.id,
                            supplierId : product.supplierId,
                            quantity : product.quantity,
                          
                        }
                    })
            },"",false);

            // if the fetch failed throw an error 
            if(!response.ok)
            {
                throw new Error("SomeThing went Wrong");

            // in success case reveal success box
            }else{
                handleSuccessBox();
            }
        
        // Catch any error my happen and reveal error box 
        } catch (error) {
            
            console.log(error);
            handleErrorBox();
            
        }

    }

    // Check if the user logged in
    useEffect(() =>{
        const decoded = CheckSignIn();
        if(decoded){
            setRole(decoded.typ);
            setRetailerId(decoded.RoleId)
        }else{
            // logout operation 
        }
    },[isLoggedIn ]);



    return (
    <>
        {/* In case use was retailer it will show the cart in header */}
        {role === "Retailer" ?   <i onClick={handleCartBox} class="bi bi-bag-fill fs-3 me-3"></i> : null}
        
         {/* The section that will pop up when we click the cart icon  */}
        <Modal open={cartBoxState} onClose={handleCartBox}>
            <Box className="productCard dark_border" sx={style} > 

                {/* Mapping The Products in The Cart if There Any Products Added to The Cart */}
                {currentProducts && currentProducts.length > 0  ? 
                <div> 
                    {
                    currentProducts.map((product , index) =>{
                        return(
                            <ProductInCart key={index} title={product.title} quantity={product.quantity} id={product.id} price={product.price} imageUrl={product.imageUrl} />
                        )
                    })
                    }

                    {/*  Displaying the total price for order and make order button  */}
                    <div className="d-flex justify-content-between">
                        {/* Total price */}
                        <div className="btn btn-secondary rounded-5 shadow dark_mode pt-0 pb-0"> Total <span className="btn btn-success dark_mode rounded-5">{total} REY</span></div>
                        {/* Make order button */}
                        <button className="btn btn-primary dark_mode border border-1 rounded-5 shadow ps-3 pe-3" onClick={() =>{
                            // Open Confirmation Box
                            handleConfirmationBox();

                        }} >Make Order</button>
                    </div>

                </div>
            
                // If there no products in cart
                :<EmptySection msg={"Cart is Empty"} /> }
               
            </Box>
        </Modal>
                            
        {/* Confirmation pop up box */}
        <ConfirmationMsg  handleConfirmationBox={handleConfirmationBox} confirmationBoxState={confirmationBoxState} makeOrder={makeOrder} />

        {/* success and failed pop uo boxes */}
        <MsgBox msg={"Your order has been made successfully"} open={successBoxState} close={handleSuccessBox} icon={"bi bi-check2 text-success"} />
        <MsgBox msg={"Something went wrong"} open={errorBoxState} close={handleErrorBox} icon={"bi bi-x-lg text-danger"} />
    </>

      );
}

export default Cart;