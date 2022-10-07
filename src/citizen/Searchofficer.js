import React from "react";
import Navbar from "../Basic/Navbar";
import Leftsidecitizen from "../Dashbaord/Leftsidecitizen";
import Search from "../officer/Search";

const Searchofficer = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <div>
        <div className="row m-5" style={{ maxWidth: "100%" }}>
          <div className="col-3 col-md-3 p-4 bg-white ">
            <Leftsidecitizen />
          </div>
          <div
            className="col-9 col-md-9 p-4"
            style={{
              border: "15px",
              height: "80vh",
              backgroundColor: "#92cae8",
            }}
          >
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchofficer;
