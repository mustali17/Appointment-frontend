import React from "react";

import Image from "../image/7566.jpg";

const About = () => {
  return (
    <div className="container">
    <div className="card my-5  ">
      <div className="row g-0">
        <div className="col-md-4 order-md-2">
          <img src={Image} className="img-fluid rounded-start" alt="..." 
          width={300}
            height={300}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">GMC Appointment Booking</h5>
            <p className="card-text">
            The Gandhinagar Municipal Corporation was set up on 16 March 2010 after
            a ruling by the Gujarat High Court in 2009. Prior to that, Gandhinagar
            was the only state capital in India which did not have an elected body 
            administrating it. The establishment of a Municipal Corporation to 
            administrate and govern the city introduced municipal taxes to the 
            residents of the city as well as made the city eligible to receive 
            funding from the Government of India under the 
            Jawaharlal Nehru National Urban Renewal Mission (JnNURM)
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
