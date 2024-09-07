// React stuff
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import SidePhone from "./Sidebar/SidebarBtnPhone";

//Components
import Cart from "../../Business/Cart";

//External Libleries
import Cookies from "js-cookie";

//Contexts
import { IsLogged } from "../../../Helpers/Context/Account";

//Helpers and styles
import DarkMode from "../../../Helpers/DarkMode";
import CheckSignIn from "../../../Helpers/CheckSignIn";
import "../../../styles/main/Header.css";

function Header() {

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? true : false;
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      document.body.dataset.bsTheme = "dark";
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      document.body.dataset.bsTheme = "light";
    }
  }, [isDarkMode]);



  //Define Methods
  const naviagte =  useNavigate();

  //Define the context
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLogged);

  //Define States
  const [decodedToken, setDecodedToken] = useState();


  useEffect(() => {
    const decoded = CheckSignIn();
    if (decoded) {
      setDecodedToken(decoded);
    }
  }, [isLoggedIn]);


 

  // Logout function
  function logout(e) {
    e.preventDefault();

    //remove the token and logout the current user
    setIsLoggedIn(false);
    Cookies.remove("token");

    //route user to the main page
    naviagte("/");
    window.location.reload();
  }
  return (
    <header className="t_t_c   h-0 d-flex justify-content-between">
      <div className="d-flex  ">
        {/* Profile section */}
        <nav className="phone_nav navbar d-none">
  <div className="container-fluid p-0 ms-2">
    <button
      className="navbar-toggler focus-ring focus-ring-light border-0"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span className="bi bi-list fs-3 t_t_c"></span>
    </button>
    <ul className="dropdown-menu ps-2">
      <li>
        <SidePhone toWhere="/" value="Main Page" />
      </li>
      <li>
        <SidePhone toWhere="/categories" value="Categories" />
      </li>
      <li>
        <SidePhone toWhere="/suppliers" value="Suppliers" />
      </li>
      <li>
        <SidePhone toWhere="/tutorials" value="Tutorials" />
      </li>
      {decodedToken && decodedToken.typ === "Supplier" ? (
        <>
          <li>
            <Link className="dropdown-item mb-2 ps-2" to={"/dashboard/profile"}>
              Personal Information
            </Link>
          </li>
          <li>
            <Link className="dropdown-item mb-2 ps-2" to={"/dashboard/orders"}>
              Orders
            </Link>
          </li>
          <li>
            <Link className="dropdown-item mb-2 ps-2" to={"/dashboard/products"}>
              My Products
            </Link>
          </li>
          <li>
            <Link className="dropdown-item mb-2 ps-2" to={"/dashboard/Subscription"}>
              Subscription
            </Link>
          </li>
        </>
      ) : decodedToken && decodedToken.typ === "Retailer" ?(
        <li>
          <Link className="dropdown-item ps-2" to={"/dashboard/trackOrder"}>
            Track Order
          </Link>
        </li>
      ): null}
    </ul>
  </div>
</nav>

        <div>
          {/* Profile icon */}
          {decodedToken ? <i
            className="bi bi-person-fill fs-3 m-2 d-inline "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {" "}
          </i> : null}
          

          {/* In Case logged in  */}
          {isLoggedIn && decodedToken ? (
            <ul className="dropdown-menu">
              {/* Profile Router */}
              <li>
                {" "}
                <Link className="dropdown-item" to="/dashboard/profile">
                  Profile
                </Link>{" "}
              </li>

              {/* If it was retailer this router will be revealed */}
              {decodedToken.typ === "Retailer" ? (
                // Track order page router
                <li>
                  <Link className="dropdown-item" to="/dashboard/trackorder">
                    Track Order
                  </Link>
                </li>
              ) : null}

              {/* Logout button */}
              <li>
                <button onClick={logout} className="dropdown-item">
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            // In case not logged in
            // Reveal the sign in and sign up buttons
            <ul className="dropdown-menu">
              <li>
                {" "}
                <button className="dropdown-item"> Sign In </button>{" "}
              </li>
              <li>
                <button className="dropdown-item"> Sign Up </button>
              </li>
            </ul>
          )}
        </div>

        {/* Dark Mode Section  */}
        <div className="mt-2 ms-2">
          <i className="pointer_moon bi bi-moon-fill fs-4 d-inline" onClick={toggleTheme}></i>
        </div>
      </div>

      {/* The Cart Section  */}
      <div className=" mt-2">
        <Cart />
      </div>
    </header>
  );
}

export default Header;
