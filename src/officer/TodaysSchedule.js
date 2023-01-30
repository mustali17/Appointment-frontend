import React, { useState, useEffect } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import emailjs from '@emailjs/browser';

const TodaysSchedule = () => {
  const [reason, setReason] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      var token = localStorage.getItem("token");
      var decoded = jwt_decode(token);
      const { data } = await Axios.post(
        `http://localhost:5000/officers/todays-appointments`,
        {
          officerId: decoded._id,
        }
      );

      setAppointments(data);
      console.log(data);
    };

    fetchAppointments();
  }, []);
    function promptMe(appointmentId,citizenName,citizenId,officerName){
      const getcitizenDetails = async () => {
        const res = await Axios.get(
          `http://localhost:5000/citizens/getcitizenEmail/${citizenId}`
        );
        if (res.status === 200) {
          window.localStorage.setItem("citizen", JSON.stringify(res.data));
        } else {
          console.log(res.data.message);
          
        }
      };
      getcitizenDetails();
      let reason = prompt("Please enter your Reason:", "Invalid Appointment");
      const obj = {
        from_name:"GMC",
        to_name:citizenName,
        officerName:officerName,
        reason:reason,
        to_email: JSON.parse(localStorage.getItem("citizen")).email,
        message:"Your Appointment has been canceled"
      };
      if(reason == null || reason == ""){
        console.log(JSON.parse(localStorage.getItem("citizen")).email);
      }else {
        console.log("Appointment Canceled");
        try {
          const res = fetch(`http://localhost:5000/appointments/cancel/${appointmentId}`,
          {
           method: "DELETE",
           body:appointmentId,
       }
               
          )
          // console.log(res);
          
      }
      catch(err){
          console.log(err);
      }
    emailjs.send('service_tp2ckbf', 'template_k2uk10t', obj, 'v5KmhGEgtD2XNLFzc')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
      }
  }
  return (<>
    <table className="table table-hover table-dark" border={1}>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Citizen Name</th>
          <th scope="col">Reason for appointment</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment._id}> 
            <th scope="row">{appointment.date}</th>
            <th scope="row">{appointment.slotTime}</th>
            <th scope="row">{appointment.citizenName}</th>
            <th scope="row">{appointment.reason}</th>
            <th scope="row"><button type="button" className="btn btn-danger btn-block" onClick={()=>promptMe(appointment._id,appointment.citizenName,appointment.citizenId,appointment.officerName)}>Cancel</button></th>
          </tr>
        ))} 
      </tbody>
    </table>
    {/* <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Cancel Appointment</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want to cancel this appointment?<br/>
        Enter your reason to cancel the appointment:<br/>
        <input type="text" placeholder="Provide Short Reason" onChange={e => setReason(e.target.value)}/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        {appointments.map((appointment) => ( <button type="button" class="btn btn-primary" onClick={cancel}>Cancel{appointment._id}</button>))} 
      </div>
    </div>
  </div>
</div> */}
</>
  );
};

export default TodaysSchedule;
