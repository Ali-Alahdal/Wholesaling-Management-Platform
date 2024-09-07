import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import CheckSignIn from "../../../../Helpers/CheckSignIn";
function SidePhone(props) {

  

  return (
    <>
      <li className="mb-3">
        {/* A Link to change the route depending on props */}
        <div className="d-flex justify-content-between">
          <NavLink className={"phone_Links p-2 rounded-5"} to={props.toWhere}>
            {props.value}
          </NavLink>
          
        </div>
      </li>
    </>
  );
}

export default SidePhone;
