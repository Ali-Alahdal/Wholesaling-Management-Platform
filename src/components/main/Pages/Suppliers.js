import { useEffect, useState } from "react";
import FetchAPIs from "../../../Helpers/FetchAPIs";
import SqureImage from "./ImageComponents/SquareImage";
import EmptySection from "../../Separate/EmptySection";


function Main(){

   const [suppliers, setSuppliers] = useState([]);
   useEffect(() =>{
      async function fetchSuppliers()
      {
         const response = await FetchAPIs("supplier/all");
         const responseJson = await response.json();
         setSuppliers(responseJson);
      }
      fetchSuppliers();
   },[])
 

   return (
      <main className=''>
        <div className="main_div ms-5 me-5">

               <div className='dark_mode d-flex justify-content-between shadow t_bg_c bg-gradient rounded-5 p-5  '>
                  <div className='align-self-center'> 
                     <h1>All Supplier </h1>
                  </div>
                  <div>
                  <i class="big_icons bi bi-truck"></i> 
                  </div>

               </div>

               <section className='ms-3'>
                  
                  {/* Sub title for the section */}
                  <div className=' w-100  mb-5 mt-5'>
                        <h3 className='d-block t_t_c '>Suppliers <i class="bi bi-arrow-right-circle-fill"></i> </h3>
                  </div>
   
                     {/* The Grid for Categories Section */}
                     <div className='gap_sm row row-cols-auto gap-5 justify-content-center'> 
                        {suppliers.length >  0 ?  suppliers.map((supplier,index) => {
                           const user = supplier.user;
                           return(
                              <SqureImage key={index} toWhere={'/supplier/' + user.businessName} data={supplier}  imageUrl={user.logoUrl
                              } name={user.businessName}  />
                           );
                           
                        }) : <EmptySection msg={"There are No Suppliers Now, We're Sorry"} />}
                     </div>
   
               </section>

        </div>
        
      </main>
   );
}

export default Main;

