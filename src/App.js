// React Hooks and Methods
import  { useEffect, useState , useContext } from 'react';
import { BrowserRouter,Routes,Route, Link   } from 'react-router-dom';

// Main Content Components
import Main    from './components/main/Pages/Main';
import Suppliers from "./components/main/Pages/Suppliers";
import Categories from "./components/main/Pages/Categories";
import Tutorials from "./components/main/Pages/Tutorials";
import Category from './components/main/Pages/Category';
import Supplier from './components/main/Pages/Supplier';

// Layout Components
import Sidebar from './components/main/Layout/Sidebar';
import Header from './components/main/Layout/Header';
import Footer from './components/main/Layout/Footer';

// Reatiler and Supplier Components
import Profile from './components/main/Pages/Profile';
import SupplierSidebar from './components/main/Layout/SupplierSidebar';
import Products from './components/Supplier/Products';
import Orders from './components/Supplier/Orders';
import Subscription from './components/Supplier/Subscription';
import TrackOrder from './components/Business/TrackOrder';

// Seoarate Components
import MsgBox from './components/Separate/MsgBox';

//Context 
import { CartProducts, Total } from './Helpers/Context/Cart';
import { IsLogged  } from "./Helpers/Context/Account";

// Style
import './styles/main/App.css';

// Helpers
import CheckSignIn from './Helpers/CheckSignIn';
import FetchAPIs from './Helpers/FetchAPIs';
import Cookies from 'js-cookie';



function App() {

  // Define States 
  const [decodedToken ,setDecodedToken] = useState(); 
  const [renewState , setRenewState] = useState(false);
  const [isActive , setIsActive] = useState();
  const [isDefaultState , setIsDefaultState] = useState(false);
  const [remainingDays , setRemainingDays] = useState();
 

  // Define States for context providers
  const [currentProducts,setCurrentProducts] = useState([]);
  const [total , setTotal] = useState(0);
  const [isLoggedIn,setIsLoggedIn] = useState(false);


  // Check if the user logged in by checking the token
  useEffect(() =>{
    if(!isLoggedIn){
      const decoded  = CheckSignIn();
      if(decoded){
        setIsLoggedIn(true);
        setDecodedToken(decoded)
      }else{
        // Logout Process
        setIsDefaultState(false);
      }
    }
  
  },[isLoggedIn]);

  
  // If the user is a supplier send request to server to fetch his subscripion details and handle the request
  useEffect(()=>{
    
    // Fetching Supplier Current Subscription details
    async function fetchSubscription() {
      try {
        const response = await FetchAPIs(`Subscription/IsActive/${decodedToken.RoleId}`,"GET");
        if(!response.ok){
          throw new Error("Something went wrong");
        }else{
          const responseJson = await response.json();
          if(responseJson){

            setIsActive(responseJson.state);
            if(responseJson.type === "default" &&responseJson.state ){
              setRemainingDays(responseJson.timeLeft)
              setIsDefaultState(true);
            } 
          }else{
            throw new Error("Something went wrong");
          }
        }
      } catch (error) {
        setRenewState(true);
      }
    }
    // If The use is a supplier fetch 
    if(decodedToken){
     
      if(decodedToken.typ === "Supplier"){
        fetchSubscription();
        
      }
    }
    
  },[decodedToken,isLoggedIn]);



  // Check if the user has active subscription and show pop up box
  useEffect(() =>{
    if(isActive != null ){
     
      setRenewState(!isActive);

    }
  
  },[isActive,isLoggedIn]);
  return (
    <div className="App">

        <BrowserRouter>

          {/* Sidebar components based on current route */}
          <Routes>
            
            <Route path="*" element={ <Sidebar />} />
            <Route path="/dashboard/*" element={  <SupplierSidebar />} />
            
          </Routes>

          <div className='main_container container-fluid '>

            {/* Context Proviedrs , logged in, Cart Products, Order Total */}
            <IsLogged.Provider value={{isLoggedIn,setIsLoggedIn}}>
            <CartProducts.Provider value={{currentProducts , setCurrentProducts}}>
            <Total.Provider value={{total, setTotal}}>

              {/* Header  */}
              <Header />

              {/* Page Content Based on current route */}
              <Routes>
                
                {/* Main Side */}
                <Route index path='/' element={ <Main />} />
                <Route path='/suppliers' element={<Suppliers />} />
                <Route path='/categories' element={<Categories />} />
                <Route path='/tutorials' element={<Tutorials />} />
                <Route path='/category/:categoryID' element={<Category />} />
                <Route path='/supplier/:name' element={<Supplier />} />

                {/* Supplier Dashboard */}
                <Route path='/dashboard/profile' element={<Profile /> } />
                <Route path='/dashboard/products' element={<Products /> } />
                <Route path='/dashboard/orders' element={<Orders />} />
                <Route path='/dashboard/subscription' element={<Subscription />} />


                {/* Retailer DashBoard */}
                <Route path='/dashboard/trackorder' element={<TrackOrder />} />
              </Routes>

              
              <MsgBox open={isDefaultState} close={()=>{setIsDefaultState(!isDefaultState)}}  msg={

                <div>

                  <p className='mt-3 mb-1'>Your Now in Demo Period You have to Subscribe or Contact Us.</p>
                  <p>Remaining Days : <span className='text-danger'> {remainingDays} </span></p>
                  <a href="https://wa.me/+905357914049" target='_blank'  className='btn bg-success text-white'>
                    <i className='bi bi-whatsapp text-white me-1 '></i>   Contact Us
                  </a>

                  <Link onClick={
                    () =>{
                      setIsDefaultState(!isDefaultState);
                      
                    }
                  } className='bg-primary text-white btn ms-3 ' to='/dashboard/subscription'>
                    <i className='bi bi-box-arrow-right  me-1 '></i>  Browse Plans
                  </Link>
                </div>} 
              icon={"bi bi-clock-history text-warning display-1"} />

              
            {/* End of Context Providers  */}
            </Total.Provider>
            </CartProducts.Provider>
            </IsLogged.Provider>

            {/* Footer */}
            <Footer />

          </div>

        </BrowserRouter>

        {/* Renew Message  */}
        <MsgBox open={renewState}  msg={
          <div>
            <p className='mt-3'>Your Subscription Has Ended, To Continue Using our Service You Have To Renew</p>
            <a href="https://wa.me/+905357914049" target='_blank'  className='btn bg-success text-white'>
              <i className='bi bi-whatsapp text-white me-1 '></i>   Renew Now
            </a>

            <a onClick={
              () =>{
      
                Cookies.remove("token");
                setIsLoggedIn(false);
                setDecodedToken(null);
                setRenewState(false);
                setIsActive(null);
              }
            } className='bg-warning text-white btn ms-3 ' href='/'>
              <i className='bi bi-box-arrow-right  me-1 '></i>   Logout
            </a>
          </div>
        } icon={"bi bi-clock-history text-danger display-1"} />



    </div>

 
  );
}

export default App;
