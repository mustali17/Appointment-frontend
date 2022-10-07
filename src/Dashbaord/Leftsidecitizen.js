import React from "react";
import Option from "./Option";
import "./dashboard.css";
import { Link } from "react-router-dom";

const Leftsidecitizen = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/citizen">
            <Option Value="Personal Details" />
          </Link>
        </li>
        <li>
          <Link to="/citizen/searchofficer">
            <Option Value="Search Officer" />
          </Link>
        </li>
        <li>
          <Link to="/citizen/appointment-status">
            <Option Value="Appointment Status" />
          </Link>
        </li>

        <li>
          <Link to="/citizen/previousappointments">
            <Option Value="Previous Appointments" />
          </Link>
        </li>

       
      </ul>
    </div>
  );
};

export default Leftsidecitizen;
