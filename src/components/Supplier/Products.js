// React Hooks
import { useEffect, useState } from "react";

// Components
import SupplierProduct from "./SupplierProduct";
import AddNewProductForm from "./AddNewProductForm";
import EmptySection from "../Separate/EmptySection";

// Helpers
import FetchAPIs from "../../Helpers/FetchAPIs";
import CheckSignIn from "../../Helpers/CheckSignIn";

function Products() {
  // Define state
  const [decodedToken, setDecodedToken] = useState();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refetch, setRefetch] = useState(false);

  // Reload content using state changing
  function refetchData() {
    !refetch ? setRefetch(true) : setRefetch(false);
  }

  // Request for categories to display it in components and handle it
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await FetchAPIs("category/all");

        if (!response.ok) {
          throw new Error("An Error Happend");
        } else {
          const responseJson = await response.json();
          if (responseJson) {
            setCategories(responseJson);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchCategories();
  }, []);

  // Request for the current supplier to get his products and handle it.
  useEffect(() => {
    async function getSupplier() {
      try {
        const response = await FetchAPIs(
          `supplier/${decodedToken.RoleId}`,
          "GET"
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        } else {
          const responseJson = await response.json();
          if (responseJson) {
            setProducts(responseJson.products);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    // In Case there a token
    if (decodedToken) {
      getSupplier();
    }
  }, [decodedToken, refetch]);

  // Check if the user Signed in
  useEffect(() => {
    const decode = CheckSignIn();
    if (decode) {
      setDecodedToken(decode);
    } else {
      // Logout Prossess
    }
  }, []);

  return (
    <main>
      {/* Here's The Content Of The Page  */}
      <div className="main_div ms-5 me-5">
        {/* This is a block of Introduction for the page */}
        <div className="dark_mode d-flex justify-content-between shadow t_bg_c bg-gradient rounded-5 p-5">
          {/* Title section */}
          <div className="align-self-center ">
            <h1> My Products </h1>
          </div>

          {/* Icon  */}
          <div>
            <i class="dark_mode big_icons bi bi-box-seam-fill "></i>
          </div>
        </div>

        <section className="text-center mt-5 mb-4">
          {/* Title for section and add product plus icon */}
          <div className=" w-100  mb-5 d-flex justify-content-between text-center p-o">
            <h3 className="t_t_c">
              My Products <i class="bi bi-arrow-right-circle-fill"></i>{" "}
            </h3>
            <AddNewProductForm
              refetchData={refetchData}
              supplierId={decodedToken ? decodedToken.RoleId : 0}
              categories={categories ? categories : []}
            />
          </div>

          {/* Grid the products */}
          <div className="row row-cols-1 gy-3 m-2 ">
            {/* Mapping the products */}
            {products.length > 0 && categories.length > 0 ? (
              products.map((product, index) => {
                return (
                  <SupplierProduct
                    key={index}
                    product={product}
                    categories={categories}
                    refetchData={refetchData}
                  />
                );
              })
            ) : (
              <EmptySection msg={"There is no  Products you Addedd"} />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Products;
