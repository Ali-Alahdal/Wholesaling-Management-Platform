// React hooks
import { useState } from "react";

// Components
import ContactUs from "../Separate/ContactUs";

function Plan(props) {
  // Featurs Arry list
  const features = [
    "Access to The All Features",
    "Access to The All Tutorials",
    "Get The Latest Updates",
    "Support Service",
  ];

  // Handlers for pop up box
  const [openContactUs, setOpenContactUs] = useState(false);
  function contactUsBox() {
    openContactUs ? setOpenContactUs(false) : setOpenContactUs(true);
  }

  return (
    <div className="border dark_border rounded-4 shadow p-4 w-auto h-100">
      {/* Plan upper section name, period, price */}
      <div className="text-center  h-25 mt-4">
        <h1> {props.name} </h1>
        <h3 className={"d-inline"}>{props.price}</h3>{" "}
        <span> {props.period} Month</span>
      </div>

      {/* Mapping all features */}
      <div className="h-auto mt-4 ">
        {features.map((item, index) => {
          return (
            <div className="mb-3">
              {/* if the plan has certain number of features will  display them with correct icon  */}
              {/* otherwise will display them with the x icon  */}
              {index < props.features ? (
                // Correct icon

                <i className="text-success bi bi-check-circle-fill fs-5 m-2"></i>
              ) : (
                // X icon
                <h3 className="bi bi-x-lg text-danger d-inline align-middle"></h3>
              )}

              {/* The feature */}
              <div className="d-inline text-dark-emphasis"> {item} </div>
            </div>
          );
        })}
      </div>

      {/* Contact us button section */}
      <div className="mt-4 text-center ">
        <button
          onClick={contactUsBox}
          className="dark_mode bg-success fs-6 btn rounded-pill "
        >
          Contact Us
        </button>
      </div>

      {/* The pop up message for contact us */}
      <ContactUs open={openContactUs} close={contactUsBox} />
    </div>
  );
}

export default Plan;
