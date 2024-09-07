//React Hooks
import { useState , useContext } from "react";

//MUI Components
import { Modal , Box } from "@mui/material";

//Contexts
import { CartProducts, Total } from "../../Helpers/Context/Cart";



const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
  };

function ConfirmationMsg(props) {

    // Define Contexts
    const {currentProducts , setCurrentProducts} = useContext(CartProducts);
    const {total , setTotal } = useContext(Total);
    

    return ( 

        <Modal open={props.confirmationBoxState} onClose={props.handleConfirmationBox}>
            <Box className="productCard" sx={style} >
                {/* Confirmation Message Content */}
                <div className="text-center dark_border">

                    {/* Message Text */}
                    <div> 
                        Are You Sure You Want To Do This Order 
                        When Ever The Driver Came out You Should <br /> 
                        Pay : <span className="bg-primary p-1 rounded-5 dark_mode m-auto"> {total + " REY"} </span>
                    </div>

                    {/* Cancel and confirm buttons */}
                    <div className="w-100 mt-3   ">
                        <button onClick={props.handleConfirmationBox} className="btn btn-danger rounded-5 p-2 dark_mode me-3"> Cancel </button>
                        <button onClick={()=> {
                            
                            props.handleConfirmationBox();
                            setTotal(0);
                            setCurrentProducts([]);
                            props.makeOrder();
                        }}  className="btn btn-success rounded-5 p-2 dark_mode"> Confirm </button>
                    </div>
                </div>
            </Box>
        </Modal>

     );
}

export default ConfirmationMsg;