// React hooks
import { useEffect, useState } from "react";

// MUI Components
import { Modal, Box } from "@mui/material";

// Components
import MsgBox from "../Separate/MsgBox";

// Externals Liblieries
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

// Heleprs
import FetchAPIs from "../../Helpers/FetchAPIs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 2.5,
};
function AddNewProductForm(props) {
  // Define States
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState();
  const [uploadedImage, setUploadedImage] = useState();

  // Define state for pop up boxes
  const [addProductBoxState, setAddProductBoxState] = useState(false);
  const [successBoxState, setSuccessBoxState] = useState(false);
  const [errorBoxState, setErrorBoxState] = useState(false);

  // Handlers for pop up boxes
  function handleAddProductBoxState() {
    !addProductBoxState
      ? setAddProductBoxState(true)
      : setAddProductBoxState(false);
  }

  function handleSuccessBox() {
    !successBoxState ? setSuccessBoxState(true) : setSuccessBoxState(false);
  }

  function handleErrorBox() {
    !errorBoxState ? setErrorBoxState(true) : setErrorBoxState(false);
  }

  // Valditon Schema For Product Form
  const valdationProductSchame = yup.object({
    title: yup.string().min(2).required(),
    description: yup.string().required(),
    price: yup.number().required(),
    stockQuantity: yup.number().required(),
    categoryId: yup.number().required(),
  });

  // Handle image changes
  function handleImage(e) {
    e.preventDefault();
    setUploadedImage(e.target.files[0]);

    // Convert the local file to url so it can be viewed
    const preview = URL.createObjectURL(e.target.files[0]);
    setImagePreview(preview);
  }

  // Request for backend to add new product and handle it
  async function addNewProduct(formContent) {
    try {
      const response = await FetchAPIs(
        `products/add`,
        "POST",
        {
          ...formContent,
          supplierId: parseInt(props.supplierId),
          image: uploadedImage,
        },
        "form-data",
        false
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        const responseJson = await response.json();
        if (responseJson) {
          handleSuccessBox();
          handleAddProductBoxState();
          setImagePreview("");
          setTimeout(() => {
            props.refetchData();
          }, 2 * 1000);
        }
      }
    } catch (error) {
      handleErrorBox();
    }
  }

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  return (
    <>
      <div
        onClick={handleAddProductBoxState}
        className="btn btn-success rounded-5 dark_mode"
      >
        <i className="bi bi-plus-circle-dotted fs-3"></i>
      </div>
      <Modal open={addProductBoxState} onClose={handleAddProductBoxState}>
        <Box className="productCard" sx={style}>
          <div>
            {/* Image Add and Chnage Section */}
            <div className="position-relative d-flex bg-primary-subtle justify-content-center mb-3 border border-2 rounded-3">
              {/* Camera Icon and Input For image */}
              <div class="position-absolute top-50 start-50 translate-middle">
                <label for="image">
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

              {/* Displaying current image */}
              <img
                className="rounded-3 m-1"
                style={{ height: 200 }}
                src={imagePreview}
                alt=""
              />
            </div>

            {/* Initiailizing the form and valdation schema */}
            <Formik
              initialValues={{
                title: "",
                description: "",
                price: 0,
                stockQuantity: 1,
                categoryId: 1,
              }}
              validationSchema={valdationProductSchame}
              onSubmit={(e) => {
                addNewProduct(e);
              }}
            >
              {({ isSubmiting }) => (
                <Form>
                  {/* Top Secton title , price , stock quantity */}
                  <div className="d-flex dtent-space t_t_c justify-content-between">
                    <div>
                      <label htmlFor="name">Product Name</label>
                      <Field
                        className="mt-2 p-1 border form-control rounded-5"
                        name="title"
                        id="name"
                      />
                    </div>

                    <div className="w-25">
                      <label htmlFor="Stock">Stock</label>
                      <Field
                        className="mt-2 p-1 ps-3 border form-control rounded-5"
                        name="stockQuantity"
                        id="Stock"
                      />
                    </div>
                  </div>

                  {/* Description input */}
                  <div className="mt-2 t_t_c">
                    <label htmlFor="description">Product Decription</label>
                    <Field
                      as={"textarea"}
                      className="border form-control bg-light w-100 rounded-4"
                      name="description"
                      rows={3}
                    />
                  </div>

                  {/* Category select list and submit button */}
                  <div className="d-flex justify-content-between t_t_c mb-2">
                    {/* Select input */}
                    <div class="form-floating w-50 mt-2">
                      <Field
                        as={"select"}
                        class="form-select overflow-x-hidden rounded-5 categoryList"
                        id="floatingSelectGrid"
                        name="categoryId"
                      >
                        {props.categories.length > 0
                          ? categories.map((item, index) => {
                              return (
                                <option
                                  key={index}
                                  className="productCard"
                                  value={item.id}
                                >
                                  {item.name}
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
                        name="price"
                        id="price"
                      />
                    </div>
                  </div>
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
        msg={"Your product has been added successfully"}
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

export default AddNewProductForm;
