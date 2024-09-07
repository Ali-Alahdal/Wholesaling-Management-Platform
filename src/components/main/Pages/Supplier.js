// React Hook and methods
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import Product from "../../Product";
import EmptySection from "../../Separate/EmptySection"

// Helpers
import FetchAPIs from "../../../Helpers/FetchAPIs";

function Supplier(props){

    // Define Methods
    const location = useLocation();

    //  Variables
    const cate = location.state.from2;

    // Define States
    const [products,setProducts] = useState([]);
    const [displayedProducts , setDisplayedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [supplierUser,setSupplierUser] = useState([]);
    const [currentCategory , setCurrentCategory] = useState(cate);

   


    // Filter Products based on category chnages
    function changeCategory(e,type)
    {
        // In case no category has been choosed
        if(type == "init"  )
        {
            console.log(currentCategory)
            setDisplayedProducts( products.filter(item => item.categoryId == currentCategory.id));
            
        }else{
            
            // In case all products has been choosed
            if(e.target.value == "all")
            {
                setCurrentCategory(e.target.value)
                setDisplayedProducts(products);
            }else{
                
                // in case spcefic category choosed
                const cate = e.target.value;
                setCurrentCategory(cate)
                setDisplayedProducts( products.filter(item => item.categoryId == cate));

            }
        }
    }   

    
    
   
    
    
    // Taking data about the supplier that paased by the location from other router
    useEffect(() =>{
        function data()
        {   
            //Taking the data and assigned it
            const supplierData =  location.state.from;
            setSupplierUser(supplierData.user);

            const productsData =  supplierData.products;
            setProducts(productsData);
            setDisplayedProducts(productsData);
        }
        

        // Initializing Filter
        if(currentCategory)
        {   
            changeCategory(cate,"init");
        }

        data();
            
    },[categories]);
    

    // Fetch Categories for filter operation
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

        <main className="">

            {/* Here's The Content Of The Page  */}
            <div className='p_small ps-5 pe-5'>

                {/* This is a block of Introduction for the page */}
                <section className='dark_mode d-flex justify-content-between shadow t_bg_c bg-gradient rounded-5 p-5 '>

                    {/* Retailer Name */}
                    <div className='align-self-center'> 
                        <h1> {supplierUser.businessName} </h1>
                    </div>

                    {/* Cargo Icon */}
                    <div>
                        <i class="big_icons bi bi-box-seam-fill"></i> 
                    </div>

                </section>


                <section className='ms-3'>
                    
                    <div className='SupplierContainer d-flex justify-content-between w-100 mt-5'>

                            {/* Title for this section */}
                            <h3 className='d-block t_t_c mb-5'> Products  <i class="bi bi-arrow-right-circle-fill"></i> </h3>

                            <div className="w-25 d-flex position-relative mb-5">
                                <label class="dark_mode search_sub input-group-text t_bg_c rounded-5 border-0" for="inputGroupSelect01"><i class="bi bi-search"></i></label>
                                <select class="form-select border-2 rounded-5 sign_form" id="inputGroupSelect01" onChange={changeCategory} value={currentCategory && currentCategory.id ? currentCategory.id : currentCategory} >
                                    <option value="all">All</option>
                                    {categories ? categories.map((category) => {
                                        return( 
                                            <option value={category.id}>{category.name}</option>
                                        ); 
                                    }) : null }
                                </select>
                            </div>
                        
                    </div>

                    {/* Grid for Products  */}
                    <div className='row row-cols-auto gap-4 gap_sm justify-content-center'>

                        {/* Mapping products that are filtered */}
                        {displayedProducts.length > 0 ? displayedProducts.map((item,index) => {
                            return( 
                                <div className="">
                                    <Product key={index}  price={item.price} data={item} imageUrl={item.imageUrl}  title={item.title}  />
                                </div>
                            );
                        }) : <EmptySection msg={"There are No Products Avalible Right Now !"} />}
                    
                    </div>

                </section>
            </div>
     
   </main>
    );
}

export default Supplier;