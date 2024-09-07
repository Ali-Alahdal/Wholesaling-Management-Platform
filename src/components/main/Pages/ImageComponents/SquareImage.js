import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";



function SqureImage(props)
{
    return (
        <div className='position-relative col text-center shadow rounded-3 border p-2 t_sub_c'>
            <Link to={props.toWhere} state={{ from : props.data , from2 : props.category}}   >  
                <Avatar className="mt-3 t_sub_c rounded" sx={{height:150 ,width:150}} src={props.imageUrl} alt={props.name}  variant="square" />
                <p className="square_supplier fw-medium mt-4 d-block t_t_c p-1 border border-1 border-primary rounded-5 ">{props.name}  </p>
            </Link>
        </div>
    );
}



export default SqureImage;