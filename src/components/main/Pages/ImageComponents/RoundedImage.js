import { Link } from "react-router-dom";


import "../../../../styles/main/Images.css";

// MUI  Components
import Avatar from '@mui/material/Avatar';
import Category from "../Category";


function RoundedImage(props)
{
    return (
        <div className='col text-center p-0'>
             <Link  to={props.toWhere} state={{ from : props.data}}   >  
           
                    <Avatar className="m-auto shadow border border-1" sx={{height:140 ,width:140}} src={props.image} alt={props.name}   />
                    <p className="mt-4 d-block p-1 border border-primary rounded-5">{props.name}</p>
                
            </Link>
        </div>
    );
}



export default RoundedImage;