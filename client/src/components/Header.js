import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Payments from "./Payments";

export const Header = () => {
  let auth = useSelector((state) => state.auth);
  console.log({ user: auth.user });
  const renderLog = () => {
    switch (auth.user) {
      case null:
        return;
      case "":
        return (
          // <Link to="/auth/google" className="right hide-on-med-and-down">
          //   Login With Google
          // </Link>
          <a href="/auth/google" className="right hide-on-med-and-down">
            Login With Google
          </a>
        );
      default:
        return (
          // <Link to="/api/logout" className="right ">
          //   Logout
          // </Link>
          [
            <li key="1">
              <Payments />
            </li>,
            <li key="2" style={{ margin: "0 10px" }}>
              Credits:{auth.credits}
            </li>,
            <li key="3">
              <a href="/api/logout" className="right ">
                Logout
              </a>
            </li>,
          ]
        );
    }
  };
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="" className="left brand-logo">
          Emaily
        </Link>

        <ul className="right">
          <li>{renderLog()}</li>
        </ul>
      </div>
    </nav>
  );
};

// const mapStateToPrpos = ({ auth }) => {
//   return { auth };
// };

export default Header;
