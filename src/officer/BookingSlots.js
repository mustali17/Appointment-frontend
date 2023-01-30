import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Basic/Navbar";
import Leftsidecitizen from "../Dashbaord/Leftsidecitizen";

import Axios from "axios";

const BookingSlots = (props) => {
  // console.log(props.location.state)
  const { date, officer } = props.location.state;
  // console.log("Date: " + date + " officerId: " + officerId);
  const [dateId, setdateId] = useState();
  const [appdate,setappdate]=useState();
  const [Slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchDate = async (dateToPost) => {
      const { data } = await Axios.post(
        `https://appointmentbackend.onrender.com/officers/get-slots/`,
        {
          officerId: officer._id,
          date: dateToPost
        }
      );
      console.log(data);
      setappdate(data.date)
      console.log(appdate);
      setdateId(data._id);
      setSlots(data.slots);
    };

    function getDateString() {
      let finalDate = date.getFullYear().toString()
      const month = date.getMonth() + 1
      const day = date.getDate();
  
      if(month < 10) {
        finalDate += ('-0' + month.toString())
      }
      else {
        finalDate += '-' + month.toString()
      }
  
      if(day < 10) {
        finalDate += ('-0' + day.toString())
      }
      else {
        finalDate += '-' + day.toString()
      }
  
      return finalDate
  
    }
    const dateToSend = getDateString()
    fetchDate(dateToSend);
  }, []);

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
            <table className="table table-hover table-light">
              <thead>
                <tr>
                  <th scope="col">Slot</th>
                  <th scope="col">Booking Status</th>
                </tr>
              </thead>
              <tbody>
                {Slots.map((slot) => (
                  <tr key={slot._id}>
                    <th scope="row">{slot.time}</th>
                    {slot.isBooked ? (
                      <td>Booked</td>
                    ) : (
                      <td>
                        <Link
                          to={{
                            pathname: "/citizen/payment",
                            data: {
                              dateId:dateId,
                              appdate:appdate,
                              officer:officer,
                              slotId:slot._id,
                              slotTime:slot.time,
                            },
                          }}
                        >
                          Book Now
                        </Link>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSlots;
