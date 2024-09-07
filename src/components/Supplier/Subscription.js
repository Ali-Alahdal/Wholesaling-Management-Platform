// Components
import { Link } from "react-router-dom";
import Plan from "./Plan";
import { useEffect, useState } from "react";

import FetchAPIs from "../../Helpers/FetchAPIs";
import CheckSignIn from "../../Helpers/CheckSignIn";


function Subscription()
{
    const [currentSubscription , setCurrentSubscription] = useState();
    const [decodedToken , setDecodedToken] = useState();
    const [linePercentage , setLinePercentage] = useState(0);
    useEffect(() =>{
        async function fetchSubscription() {
            try {
                const response = await FetchAPIs(`Subscription/IsActive/${decodedToken.RoleId}` , "GET");
                if(!response.ok)
                {
                    throw new Error("Something went wrong");
                }else{
                    const responseJson  = await response.json();
                    if(responseJson){
                        setCurrentSubscription(responseJson);
                       
                       
                        console.log(responseJson);
                        
                    }else{
                        throw new Error("Something went wrong json");
                    }
                }
            } catch (error) {
                console.log(error);
                
            }
        }


        if(decodedToken){
            fetchSubscription();
       
            
        }
       
    },[decodedToken])

    useEffect(()=>{
        if(currentSubscription){
            switch(currentSubscription.type){
                case "Monthly":
                    setLinePercentage((currentSubscription.timeLeft / 30) * 100);
                    
                break;
                case "quarterly" :
                    setLinePercentage((currentSubscription.timeLeft / 90) * 100);
                    console.log((currentSubscription.timeLeft / 90) * 100);
                    
                break;
               
                case "yearly":
                    setLinePercentage((currentSubscription.timeLeft / 365) * 100);
           
                break;
                case "default":
                    setLinePercentage((currentSubscription.timeLeft / 3) * 100);
                break;
                default:
                    setLinePercentage((currentSubscription.timeLeft / currentSubscription.timeLeft ) * 100);
                   
                break;
            }
        }
    },[currentSubscription])


    
    useEffect(() =>{
        const decode = CheckSignIn();
        if(decode)
        {
            setDecodedToken(decode)
        }else{
            // Logout Prossess
        }

    },[]);

    return(
       <main>
            <div  className='main_div ms-5 me-5'>

                {/* Introduction for the page */}
                <div className='dark_mode d-flex justify-content-between shadow t_bg_c bg-gradient rounded-5 p-5'>

                    {/* Title */}
                    <div className='align-self-center'> 
                        <h1>My Subscription</h1>
                    </div>

                    {/* Icon */}
                    <div>
                        <i class="dark_mode big_icons bi bi-cash-stack "></i> 
                    </div>

                </div>


                <section className='ms-3'>

                    {/* Sub title for the section */}
                    <div className=' w-100  mb-5 mt-5'>
                        <h3 className='d-block t_t_c'>Current Plan <i class="bi bi-arrow-right-circle-fill"></i> </h3>
                    </div>

                    {/* Current plan section */}
                    <div className="border dark_border rounded-4 p-4 ps-5 t_t_c shadow">

                        {/* Plan Name  */}
                        <div className="display-6 fw-medium">{currentSubscription ? currentSubscription.type : null} Packet</div>

                        {/* Remaining Days for the plan */}
                        <div className="w-100  pe-5 mt-3">

                            <p >Days Left : {currentSubscription ? currentSubscription.timeLeft : null} </p>

                            {/* Gray Line under green  */}
                            <div className="w-100 bg-secondary rounded-3 mt-2" style={{height:"13px"}} > 

                                {/* The Green Line */}
                                <div className=" bg-success rounded-start-3 " style={{height:"13px",width:Math.floor( linePercentage) +  "%"}}></div>

                            </div>

                            {/* Button Contact us */}
                            <Link to={"https://wa.me/+905357914049"} target="_blank" className="dark_mode bg-success border-0 p-2 rounded-5 mt-3 btn">Contact Us</Link>
                        
                        </div>

                    </div>
            
                </section>

                {/* Plans  */}
                <section className=' ms-3 mt-5 t_t_c'>

                    {/* Sub title for the section */}
                    <div className=' w-100  mb-5'>
                        <h3 className='d-block'> Plans <i class="bi bi-arrow-right-circle-fill"></i> </h3>
                    </div>

                    {/* The Plans */}
                    <div className="row row-cols-2 w-100 gap-5 m-auto justify-content-center">
                        <Plan features={5} period={1} name={"Monthly"} price={"14.9$"} />
                        <Plan features={5} period={3} name={"Quarterly"} price={"29.9$"} />
                        <Plan features={5} period={6} name={"Biannual"} price={"$54.9"} />
                        <Plan features={5} period={12} name={"Yearly "} price={"99.9$"} />

                    </div>
                    
                </section>

            </div>
                
       </main>
    );
}


export default Subscription;