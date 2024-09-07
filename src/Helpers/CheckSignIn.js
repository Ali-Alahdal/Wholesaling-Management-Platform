
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


 function  CheckSignIn  () {
    const token =  Cookies.get("token")
    if(token){
        const deocded =  jwtDecode(token);
        if(deocded)
        {
            return  deocded;
        }else{
            return null;
        }

    }else{
        return null;
    }
}

export default  CheckSignIn;
