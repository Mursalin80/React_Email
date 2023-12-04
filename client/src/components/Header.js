import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Payments from "./Payments";

export const Header = () => {
  let auth = useSelector((state) => state.auth);

  const renderLog = () => {
    switch (auth.user) {
      case null:
        return;
      case "":
        return (
          <a
            href="/auth/google"
            style={{ padding: "8px 16px", fontSize: "16px" }}
          >
            Login With Google
          </a>
        );
      default:
        return (
          <a
            href="/api/logout"
            style={{ padding: "8px 16px", fontSize: "16px" }}
          >
            Logout
          </a>
        );
    }
  };
  return (
    <main>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <div>
          <Link to="" className="left brand-logo">
            Emaily
          </Link>
        </div>
        {renderLog()}
      </nav>
      {auth.user ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "20px 0",
          }}
        >
          <div style={cardStyle}>
            <h2>Payments</h2>
            <Payments />
          </div>

          <div style={cardStyle}>
            <h2>Please Join Survey. </h2>
            <Link to="/survey" className="left brand-logo">
              Survey
            </Link>
          </div>

          <div style={cardStyle}>
            <h2>Your Credits for Survey</h2>
            <h3>Credits:{auth.user?.credits}</h3>
          </div>
        </div>
      ) : null}
    </main>
  );
};

const cardStyle = {
  flex: "1",
  maxWidth: "300px",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  margin: "0 10px",
  textAlign: "center",
};

export default Header;
