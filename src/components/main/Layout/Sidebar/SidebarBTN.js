// React Hooks
import { NavLink } from "react-router-dom";

function SideBTN(props) {
  return (
    <>
      <li className=" navList position-relative p-3">
        {/* A Link to change the route depending on props */}
        <div className="side_div d-flex justify-content-start align-items-center">
          <NavLink className={"text-light pt-2 ms-2 ps-2"} to={props.toWhere}>
          <i className={props.icon}>{" "}</i>
            {props.value}
          </NavLink>
        </div>
      </li>
    </>
  );
}

export default SideBTN;
