import React, { useContext, useMemo } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/Leftsideofficer";
import jwt_decode from "jwt-decode";

import "../Dashbaord/dashboard.css";
import { AuthContext } from "../Auth/AuthContext";

const PersonalDetails = () => {
  const { token } = useContext(AuthContext);
  const officer = useMemo(() => jwt_decode(token), [token]);

  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <div>
        <div className="row m-5" style={{ maxWidth: "100%" }}>
          <div
            className="col-3 col-md-3 p-4 bg-white "
            style={{ height: "80vh" }}
          >
            <Leftside />
          </div>
          <div
            className="col-9 col-md-9 p-4"
            style={{
              border: "15px",
              height: "80vh",
              backgroundColor: "#92cae8",
            }}
          >
            <div className="card mb-4">
              <h4 className="card-header">Personal Details</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="badge badge-info mr-2 p-2 text-uppercase ">
                    Name:
                  </span>
                  <span className="text-uppercase">{officer.name}</span>
                </li>
                <li className="list-group-item">
                  <span className="badge badge-info mr-2 p-2 text-uppercase">
                    Department:
                  </span>
                  <span className="text-capitalize">
                    {officer.specialization}
                  </span>
                </li>
                <li className="list-group-item">
                  <span className="badge badge-info mr-2 p-2 text-uppercase">
                    Desiignation:
                  </span>
                  <span className="text-capitalize">
                    {officer.designation}
                  </span>
                </li>
                <li className="list-group-item">
                  <span className="badge badge-info mr-2 p-2 text-uppercase">
                    Phone No:
                  </span>
                  {officer.phoneNumber}
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PersonalDetails;
