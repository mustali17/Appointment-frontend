import React from "react";
import Card from "./Card";

import officerlogin from "../image/4565.jpg";
import citizenlogin from "../image/8741.jpg";

const LoginButton = () => {
  return (
<<<<<<< HEAD
   
    
   
   
   <div class="container">
    <div class="row justify-content-center">
      <div class="col-4">
      <Card Image={doctorlogin} link={"/doctorlogin"} />
      </div>
      <div class="col-4">
=======
    <div className="d-flex flex-md-row flex-column justify-content-around align-items-center my-4">
      <Card Image={officerlogin} link={"/officerlogin"} />
>>>>>>> 9da060276b94b5c91ceb381ad7690a62923ea488
      <Card
        LoginButton="citizen"
        Image={citizenlogin}
        link={"/citizen"}
        login="citizen"
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
//     <Card Image={officerlogin} link={"/officerlogin"} />
//   </div>
//   <div className="col-12 col-md-6 mb-4">
//     <Card
//       LoginButton="citizen"
//       Image={citizenlogin}
//       link={"/citizen"}
//       login="citizen"
//     />
//   </div>
// </div>
