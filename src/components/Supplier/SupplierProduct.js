// React hooks
import { useState } from "react";

// Components
import EditProductForm from "./EditProductForm";

// Helpers
import FetchAPIs from "../../Helpers/FetchAPIs";

function SupplierProduct(props) {
  // Define States
  const [currentProduct, setCurrentProduct] = useState(props.product);

  // Delete product request to backend and handle it
  async function deleteProduct() {
    try {
      const response = await FetchAPIs(
        `Products/delete/${currentProduct.id}`,
        "DELETE"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        props.refetchData();
      }
    } catch (err) {}
  }

  return (
    // Col inside the gird for prodcuts
    <div
      className="productGrid dark_border col  border border-2 rounded-3 shadow p-3  w-100 d-flex justify-contnet-between "
      style={{ height: 140 }}
    >
      {/* The section on the left */}
      <div className="w-100 d-flex ">
        {/* Image Section */}
        <div className="w-25 border rounded-3 dark_border">
          <img src={currentProduct.imageUrl} className=" rounded-3 h-100 w-100" />
        </div>
        <div className="d-flex flex-column align-items-start ms-3 justify-content-between">
          {/* Product Title and description */}
          <div className="overflow-y-hidden mt-2">
            <h5>{currentProduct.title}</h5>
            <div>{currentProduct.description}</div>
          </div>
          <p className="mt-1">
            Category :{" "}
            {props.categories
              ? props.categories.find(
                  (category) => category.id === currentProduct.categoryId
                ).name
                ? props.categories.find(
                    (category) => category.id === currentProduct.categoryId
                  ).name
                : null
              : null}{" "}
          </p>
        </div>
      </div>

      {/*the section on the right  */}
      <div className="d-flex display-6 m-auto me-2 ">
        {/* Trash and edit icons , form to edit product */}
        <EditProductForm
          categories={props.categories}
          product={currentProduct}
        />
        <i
          class=" click_btn bi bi-trash3-fill text-danger fs-3 ms-3"
          onClick={deleteProduct}
        ></i>
      </div>
    </div>
  );
}

export default SupplierProduct;
