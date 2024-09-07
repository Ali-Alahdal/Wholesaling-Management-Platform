import { useEffect, useState } from "react";

//Importing My Components
import SqureImage from "./ImageComponents/SquareImage";
import { useLocation } from "react-router-dom";

import FetchAPIs from "../../../Helpers/FetchAPIs";
function Category()
{

    const [suppliers , setSuppliers] = useState([]);
    const location = useLocation();
    const categoryData = location.state.from;
    
    const [currentCategory , setCurrentCategory] = useState(location.state.from)
    useEffect(() =>
    {
        setCurrentCategory(categoryData);
        async function fetchSuppliers()
        {
            const response = await FetchAPIs(`category/${categoryData.id}/suppliers`);
            const responseJson = await response.json();
            setSuppliers(responseJson);
        }  
        
        fetchSuppliers();
      
    },[]);
 
    
    return(
        <main>

            {/* Here's The Content Of The Page  */}
            <div className='ps-5 pe-5'>

                {/* This is a block of Introduction for the page */}
                <div className='d-flex justify-content-between shadow t_bg_c bg-gradient rounded-5 p-5 '>
                    <div className='align-self-center text-light'> 
                        <h1>Suppliers Sells :  {categoryData.name}</h1>
                    </div>
                    <div>
                    <i class="big_icons bi bi-truck text-light"></i> 
                    </div>

                </div>

                {/* This is Suppliers Section  ...............*/}
                <section className='container ms-3'>

                    {/* Sub title for the section */}
                    <div className=' w-100  mb-5 mt-5'>
                        <h3 className='d-block  t_t_c'>Suppliers <i class="bi bi-arrow-right-circle-fill"></i> </h3>
                    </div>

                   
                    
                    {/* The Grid for Suppliers Section */}
                    <div className='row row-cols-auto gap-5 '>
                        
                        {suppliers.map((supplier,index) => {
                            const user = supplier.user;
                            return( 
                                <SqureImage key={index} toWhere={'/supplier/' + user.businessName} data={supplier}  imageUrl={user.logoUrl} name={user.businessName}  />
                            );
                        })}
                    </div>

                </section>
            
            </div>
        
   </main>
    );
}


export default Category;