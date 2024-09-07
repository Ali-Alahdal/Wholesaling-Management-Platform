

import { Modal } from "@mui/material";
import {Box} from "@mui/material";




const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius:'2rem',
    boxShadow: 24,
    p: 4,
  };
function MsgBox(props)
{
    return (
        <Modal open={props.open} onClose={props.close}>
            <Box className="signup_box border rounded-4" sx={style}>
            <div className="text-center">
                <i className= {`${props.icon}  display-1`}></i>
                <p>{props.msg} </p>
            </div>
            </Box>
        </Modal>
    );
}

export default  MsgBox;