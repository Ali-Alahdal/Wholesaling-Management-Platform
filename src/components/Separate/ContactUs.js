// React hooks and methods
import {  useState } from "react";
import { Link } from "react-router-dom";

// MUI Components
import { Box, Modal } from "@mui/material";


// Style for pop up box
const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function ContactUs(props) {

    // To WhatsApp account 
    const whatAppLink = `https://wa.me/+905357914049`;
  
    return (
        <Modal open={props.open} onClose={props.close}>
            <Box sx={style}>

                <div className="text-center">

                    {/* Whatsapp icon */}
                    <Link to={whatAppLink} target="_blank" rel="noopener noreferrer">  
                        <i class="bi bi-whatsapp text-success display-1" ></i>
                    </Link>
                    
                    {/* Text */}
                    <p className="mt-3">Reach us Using Whatsapp </p>

                    {/* Router and Button To WhatsApp */}
                    <Link to={whatAppLink} target="_blank" rel="noopener noreferrer">
                        <button  className="p-3 bg-success text-white rounded-pill btn ">Message Us</button> 
                    </Link>
                    
                </div>
            </Box>
        </Modal>
    );
}

export default ContactUs;