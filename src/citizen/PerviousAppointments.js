import React, { useState, useEffect } from "react";
import Axios from "axios";
import Scrollbar from "react-scrollbars-custom";
import { BsPencilSquare } from "react-icons/bs";
import Navbar from "../Basic/Navbar";
import "../Dashbaord/dashboard.css";

import Leftside from "../Dashbaord/Leftsidecitizen";

import { Link } from "react-router-dom";

const CitizenAppointments = () => {
  const [Appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {

    const { data } = await Axios.post(
      `https://appointmentbackend.onrender.com/citizens/previous-appointments/`,
      {
        googleId: localStorage.getItem("googleId"),
      }
    );
    // console.log(data);
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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
            className="col-9 col-md-9 p-3"
            style={{
              border: "15px",
              height: "80vh",
              backgroundColor: "#92cae8",
            }}
          >
            <Scrollbar
              noScrollX
              style={{ position: "", height: "73vh", width: "150vh" }}
              className="col-12 col-md-12"
            >
              <table className="table table-hover table-dark">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Officer Name</th>
                    <th scope="col">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {Appointments.map((Appointment) => (
                    <tr key={Appointment._id}>
                      <th scope="row">{Appointment.date}</th>
                      <th scope="row">{Appointment.slotTime}</th>
                      <th scope="row">{Appointment.officerName}</th>
                      <th scope="row">
                        <div style={{
                          display: 'flex'
                        }}>
                          <Link to={`/citizen/feedback/${Appointment._id}`}>
                            <BsPencilSquare />
                          </Link>
                          {Appointment.feedback.given && <div style={{
                            margin: '0 15px'
                          }}>{Appointment.feedback.stars}/5</div>}
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Scrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenAppointments;