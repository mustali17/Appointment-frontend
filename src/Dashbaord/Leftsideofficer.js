import React from "react";
import Option from "./Option";
import "./dashboard.css";
import { Link } from "react-router-dom";

const Leftsideofficer = () => {
  return (
    <div>
      <ul className="mt-5">
        <li>
          <Link to="/officer">
            <Option Value="Today's Schedule" Option="today" />
          </Link>
        </li>
        <li style={{ textDecoration: "none" }}>
          <Link to="/officer/perosnaldetails">
            <Option Value="Personal Details" />
          </Link>
        </li>

        <li style={{ textDecoration: "none" }}>
          <Link to="/officer/payment-history">
            <Option Value="Previous Appointments" />
          </Link>
        </li>

        {/* <li style={{ textDecoration: "none" }}>
          <Link to="/officer/feedback">
            <Option Value="Feedback" />
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Leftsideofficer;
