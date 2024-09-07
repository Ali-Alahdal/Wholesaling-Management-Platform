import { useEffect, useState } from "react";
import RoundedImage from "./ImageComponents/RoundedImage";
import FetchAPIs from "../../../Helpers/FetchAPIs";
import EmptySection from "../../Separate/EmptySection";

function Main(){
   const [categories,setCategories] = useState([]);
   useEffect(()=>{
      async function fetchCategories ()
      {  
         const response = await FetchAPIs("category/all");
         const responseJson = await response.json();
         setCategories(responseJson);
      
      }
      fetchCategories();
   },[])
   
  
   return (
      <main className=''>

         <div  className='main_div ms-5 me-5'>

            <div className='dark_mode d-flex justify-content-between shadow t_bg_c bg-gradient rounded-5 p-5'>
                  <div className='align-self-center'> 
                     <h1>All Categories</h1>
                  </div>
                  <div>
                  <i class="big_icons bi bi-layers-fill"></i> 
                  </div>

               </div>
               <section className="ms-3">

                  {/* Sub title for the section */}
                  <div className=' w-100  mb-5 mt-5'>
                     <h3 className='d-block t_t_c'>Categories <i class="bi bi-arrow-right-circle-fill"></i> </h3>
                  </div>

                  {/* The Grid for Categories Section */}
                  <div className='row row-cols-auto gap-5 d-flex justify-content-center'>
                     
                     {categories.length > 0 ?  categories.map((category,index) => {
                        return( 
                           <RoundedImage  key={index} toWhere={"/category/" + category.id} data={category}  image={category.imageUrl} name={category.name}  />
                        ); 
                     })  : <EmptySection msg={"There are No Categories Now, We're Sorry"} /> }

                  </div>
         
               </section>
         </div>
        
        
       
       
    </main>
   );
}

export default Main;