import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
// import { Input} from 'reactstrap';
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/Leftsidecitizen";
import StripeCheckoutButton from "react-stripe-checkout";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import emailjs from '@emailjs/browser';
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
  const [reason, setReason] = useState('');
  const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState()
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
          `https://appointmentbackend.onrender.com/appointments/add-meet-link`,
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

  const { dateId,appdate ,officer, slotId,slotTime } = props.location.data;

  const bookSlot = async () => {
    const { data } = await Axios.post(
      `https://appointmentbackend.onrender.com/officers/book-slot/`,
      {
        googleId: localStorage.getItem("googleId"),
        citizenName: JSON.parse(localStorage.getItem("user")).name,
        slotId: slotId,
        reason:reason,
        dateId: dateId,
        officerId: officer._id,
      }
    );

    if (data.officerEmail) {
      createEvent(data._id, data.date + "T" + data.slotTime, data.officerEmail);
    }
  };
  
  const obj = {
    from_name:"GMC",
    to_name:JSON.parse(localStorage.getItem("user")).name,
    officer:officer.name,   
    dept:officer.specialization,
    desig:officer.designation,
    reason:reason,
    appdate:appdate,
    slotTime:slotTime,
    phoneNumber:JSON.parse(localStorage.getItem("user")).phoneNumber,
    to_email: JSON.parse(localStorage.getItem("user")).email,
    message:"Your Appointment has been confirmed"
  };

  const handleClick = async (token) => {

    emailjs.send('service_tp2ckbf', 'template_8hi99ng', obj, 'v5KmhGEgtD2XNLFzc')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });



    bookSlot();
    setFinalBalnce(0);
    toast("Appointment booked successfully", {
      type: "success"
    })
    history.push("/citizen");



  };
  const [change, setChange] = useState(true);
  function buttonHandler() {
    setChange(!change)
  }
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
                        <em>Date: {appdate}</em>
                      </p>
                      <p>
                        <em>Time Slot : {slotTime}</em>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="text-center">
                      <h1>Confirm Appointment</h1>
                    </div>
                    <table className="table table-hover text-white">
                      <thead>
                        <tr>
                          <th>Officer Name</th>
                          <th>Department</th>
                          <th>Designation</th>
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
                          <td
                            className="col-md-1"
                            style={{ textAlign: "center" }}
                          >
                            {officer.designation}
                          </td>

                        </tr>


                      </tbody>
                    </table>

                    <input type="checkbox" id="check" name="check" value="check" onChange={buttonHandler} />You should be present there 15 min before your appointment.
                    <br />
                    <br />
                    <button
                      type="button"
                      className="btn btn-success btn-lg btn-block"
                      onClick={handleClick}
                      disabled={change}
                    >
                      Book Now&nbsp;&nbsp;&nbsp;
                      <span className="glyphicon glyphicon-chevron-right" />
                    </button>
                    <ToastContainer />
                  </div>
                </div>
                <label for='username' ><h6>Reason: </h6> </label>
                <input
					  type="text"
            maxLength="50px"
					style={{ height: "10vh" }}
					  placeholder="Provide Short Reason"
					  onChange={e => setReason(e.target.value)}
			        	/>             
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
