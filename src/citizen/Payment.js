import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/Leftsidecitizen";
import StripeCheckoutButton from "react-stripe-checkout";
import { ToastContainer,toast } from "react-toastify";
import axios from "axios";
// import { Toast } from "react-toastify/dist/components";

function getEndDateTime(dateTime) {
  const hrs = (parseInt(dateTime.split("T")[1].split(":")[0]) + 1)
    .toString()
    .padStart(2, "0");
  const time = hrs + ":00:00";
  const date = dateTime.split("T")[0];
  return date + "T" + time;
}

const Payment = (props) => {
  const [finalBalnce, setFinalBalnce] = useState(0);
  const history = useHistory();

  function createEvent(id, dateTime, officerEmail) {
    var virtualEvent = {
      id: id,
      summary: "Appointment",
      location: "Virtual",
      description: "officer - citizen appointment",
      start: {
        dateTime: dateTime,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: getEndDateTime(dateTime),
        timeZone: "Asia/Kolkata",
      },
      conferenceData: {
        createRequest: {
          requestId: "7qxalsvy0e",
        },
      },
      attendees: [{ email: officerEmail }],
      guestsCanModify: true,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 15 },
        ],
      },
    };

    var request = window.gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: virtualEvent,
      sendUpdates: "all",
      supportsAttachments: true,
      conferenceDataVersion: 1,
    });

    request.execute(function (event) {
      console.log("Executed!");

      // Add meet link
      if (event) {
        // console.log(`AddEvent link : ${event.hangoutLink}, Id : ${id}`)
        axios.put(
          `http://localhost:5000/appointments/add-meet-link`,
          {
            appointmentId: id,
            meetLink: event.hangoutLink
          }
        ).then((x) => {
          console.log(`Updated Meet Link!`);
        })
      }
    });
  }

  const { dateId, officer, slotId } = props.location.data;

  const bookSlot = async () => {
    const { data } = await Axios.post(
      `http://localhost:5000/officers/book-slot/`,
      {
        googleId: localStorage.getItem("googleId"),
        citizenName: JSON.parse(localStorage.getItem("user")).name,
        slotId: slotId,
        dateId: dateId,
        officerId: officer._id,
      }
    );

    if (data.officerEmail) {
      createEvent(data._id, data.date + "T" + data.slotTime, data.officerEmail);
    }
  };

  useEffect(() => {
    setFinalBalnce(1.18 * officer.feesPerSession);
  }, []);

  const handleClick = async (token) => {
    

    
      bookSlot();
      setFinalBalnce(0);
      toast("Appointment booked successfully", {
        type: "success"
      })
      history.push("/citizen");
    

    
  };

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
            className="col-9 col-md-9 p-4 "
            style={{
              border: "15px",
              height: "80vh",
              backgroundColor: "#92cae8",
            }}
          >
            <div className="container text-white">
              <div className="row">
                <div className="well col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <address>
                        <strong>Gandhinagar Mahanagar Seva Sadan</strong>
                        <br />
                        1st Floor,M.S Building
                        <br />
                        Nr.District Court
                        <br />
                        Sector-11,Gandhinagar-382011
                        <br />
                        <abbr title="Phone">P:</abbr> (079) 23220440
                      </address>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 text-right">
                      <p>
                        <em>Date: 1st November, 2013</em>
                      </p>
                      <p>
                        <em>Receipt #: 34522677W</em>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="text-center">
                      <h1>Confirm Booking</h1>
                    </div>
                    <table className="table table-hover text-white">
                      <thead>
                        <tr>
                          <th>Officer Name</th>
                          <th>Department</th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="col-md-9">
                            <em>{officer.name}</em>
                          </td>
                          <td
                            className="col-md-1"
                            style={{ textAlign: "center" }}
                          >
                            {officer.specialization}
                          </td>

                          
                        </tr>

                        
                      </tbody>
                    </table>
                    
                      <button
                        type="button"
                        className="btn btn-success btn-lg btn-block"
                        onClick={handleClick}
                      >
                        Book Now&nbsp;&nbsp;&nbsp;
                        <span className="glyphicon glyphicon-chevron-right" />
                      </button>
                    <ToastContainer/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
