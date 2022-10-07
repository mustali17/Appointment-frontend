import React from "react";
import Card from "./Card";

import doctorlogin from "../image/4565.jpg";
import patientlogin from "../image/8741.jpg";

const LoginButton = () => {
  return (
   
    
   
   
   <div class="container">
    <div class="row justify-content-center">
      <div class="col-4">
      <Card Image={doctorlogin} link={"/doctorlogin"} />
      </div>
      <div class="col-4">
      <Card
        LoginButton="Patient"
        Image={patientlogin}
        link={"/patient"}
        login="Patient"
      />
      </div>
    </div>
  </div>


  );
};

export default LoginButton;

// <div
//   className="row "
//   style={{
//     maxWidth: "100%",
//     padding: "10px",
//     margin: "10px",
//     marginLeft: "190px",
//   }}
// >
//   <div className="col-12 col-md-6 mb-4  ">
//     <Card Image={doctorlogin} link={"/doctorlogin"} />
//   </div>
//   <div className="col-12 col-md-6 mb-4">
//     <Card
//       LoginButton="Patient"
//       Image={patientlogin}
//       link={"/patient"}
//       login="Patient"
//     />
//   </div>
// </div>
