// React hooks
import { useState, useEffect } from "react";

// MUI Components
import { Modal, Box } from "@mui/material";

// External Libleries
import * as yup from "yup";
import { Formik, Form, Field } from "formik";

// Heleprs
import FetchAPIs from "../../Helpers/FetchAPIs";
import MsgBox from "../Separate/MsgBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 2.5,
};
function EditProductForm(props) {
  // Define States
  const [categories, setCategories] = useState(props.categories);
  const [currentProduct, setCurrentProduct] = useState(props.product);
  const [imagePreview, setImagePreview] = useState(props.product.imageUrl);
  const [uploadedImage, setUploadedImage] = useState();

  // Define states for pop up boxes
  const [successBoxState, setSuccessBoxState] = useState(false);
  const [errorBoxState, setErrorBoxState] = useState(false);
  const [editProductBoxState, setEditProductBoxState] = useState(false);

  //Valditon Schema For Product Form
  const valdationProductSchame = yup.object({
    Title: yup.string().min(2).required(),
    Description: yup.string().required(),
    Price: yup.number().required(),
    StockQuantity: yup.number().required(),
    CategoryId: yup.number().required(),
  });

  //When image gets changed
  function handleImage(e) {
    e.preventDefault();
    setUploadedImage(e.target.files[0]);

    // Convert the local file to url so it can be viewed
    const preview = URL.createObjectURL(e.target.files[0]);
    setImagePreview(preview);
  }

  //Send Update request to backend and handle it
  async function editProduct(formContent) {
    try {
      const response = await FetchAPIs(
        `Products/Update/${currentProduct.id}`,
        "PATCH",
        {
          ...formContent,
          image: uploadedImage,
        },
        "form-data",
        false
      );

      if (!response.ok) {
        throw new Error("Something went Wrong");
      } else {
        handleSuccessBox();
        handleEditProductBoxState();
      }
    } catch (error) {
      handleErrorBox();
    }
  }

  // initializing categories and current product state
  useEffect(() => {
    setCategories(props.categories);
    setCurrentProduct(props.product);
  }, [props.categories, props.product]);

  // Handlers for pop up boxes
  function handleEditProductBoxState() {
    !editProductBoxState
      ? setEditProductBoxState(true)
      : setEditProductBoxState(false);
  }
  function handleSuccessBox() {
    !successBoxState ? setSuccessBoxState(true) : setSuccessBoxState(false);
  }
  function handleErrorBox() {
    !errorBoxState ? setErrorBoxState(true) : setErrorBoxState(false);
  }

  return (
    <>
      {/* Edit icon  */}
      <i
        class="click_btn bi bi-pen-fill text-warning fs-3"
        onClick={handleEditProductBoxState}
      ></i>

      {/* Pop up box to edit producy */}
      <Modal open={editProductBoxState} onClose={handleEditProductBoxState}>
        <Box className="productCard" sx={style}>
          <div>
            {/* Current image and input for image section */}
            <div className="position-relative d-flex bg-primary-subtle justify-content-center mb-3 border border-2 rounded-4">
              {/*camera icon input for image  */}
              <div class="position-absolute top-50 start-50 translate-middle">
                <label for="image" className="text-center p-0">
                  <i class="click_btn bi bi-camera-fill display-5 t_t_c"> </i>
                </label>
                <input
                  type="file"
                  className="d-none"
                  name="image"
                  id="image"
                  onChange={handleImage}
                />
              </div>

              {/* Current image */}
              <img
                className="rounded-4"
                style={{ height: 200 }}
                src={imagePreview}
              />
            </div>

            {/* Initiailizing the form and valdation schema */}
            <Formik
              initialValues={{
                Title: currentProduct.title,
                Description: currentProduct.description,
                Price: currentProduct.price,
                StockQuantity: currentProduct.stockQuantity,
                CategoryId: currentProduct.categoryId,
                SupplierId: currentProduct.supplierId,
              }}
              validationSchema={valdationProductSchame}
              onSubmit={(e) => {
                editProduct(e);
              }}
            >
              {/* Submiting state (Related to Formik Liblery) */}
              {({ isSubmiting }) => (
                <Form>
                  {/* Top Secton title , price , stock quantity */}
                  <div className="d-flex dtent-space t_t_c justify-content-between">
                    <div>
                      <label htmlFor="name">Product Name</label>
                      <Field
                        className="mt-2 p-1 border form-control rounded-5"
                        name="Title"
                        id="name"
                      />
                    </div>

                    <div className="w-25">
                      <label htmlFor="Stock">Stock</label>
                      <Field
                        className="mt-2 p-1 ps-3 border form-control rounded-5"
                        name="StockQuantity"
                        id="Stock"
                      />
                    </div>
                  </div>

                  {/* Decription input */}
                  <div className="mt-2 t_t_c">
                    <label htmlFor="description">Product Decription</label>
                    <Field
                      as={"textarea"}
                      className="border form-control bg-light w-100 rounded-4"
                      name="Description"
                      rows={3}
                    />
                  </div>

                  {/* Category select list and submit button */}
                  <div className="d-flex justify-content-between t_t_c mb-2">
                    {/* Select input */}
                    <div class="form-floating w-50 mt-2">
                      {/* Mapping Categories insde select input and pass the necessary data for it   */}
                      <Field
                        as={"select"}
                        class="form-select overflow-x-hidden rounded-5 categoryList"
                        id="floatingSelectGrid"
                        name="CategoryId"
                      >
                        {categories.length > 0
                          ? categories.map((category, index) => {
                              return (
                                <option
                                key={index}
                                className="productCard"
                                  value={category.id}
                                >
                                  {category.name}
                                </option>
                              );
                            })
                          : null}
                      </Field>

                      <label className="pe-0" for="floatingSelectGrid">
                        Category
                      </label>
                    </div>
                    <div className="d-flex flex-column w-25">
                      <label htmlFor="price">Price</label>
                      <Field
                        className=" p-1 ps-2 border rounded-5 form-control"
                        name="Price"
                        id="price"
                      />
                    </div>
                  </div>
                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmiting}
                    className="bg-primary p-1 pe-3 ps-3 text-white border-0 shadow rounded-5"
                  >
                    Add
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </Modal>

      {/* success and failed pop uo boxes */}
      <MsgBox
        msg={"Your product has been updated successfully"}
        open={successBoxState}
        close={handleSuccessBox}
        icon={"bi bi-check2 text-success"}
      />
      <MsgBox
        msg={"Something went wrong"}
        open={errorBoxState}
        close={handleErrorBox}
        icon={"bi bi-x-lg text-danger"}
      />
    </>
  );
}

export default EditProductForm;
