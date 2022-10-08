import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

    return (


        <div className=" row text-light bg-dark p-2"
            style={{ maxWidth: "100%", margin: "auto" }}>

            <div className="col-12 col-md-6 w-100">
                <h4 className="white-text">Contact Us</h4>
                <p className="grey-text">
                    Gandhinagar Mahanagar Seva Sadan First Floor,
                    M.S.Building, Nr.District Court,
                    Sector-11,Gandhinagar-382011

                </p>
                <p className="grey-text">
                    Phone No.- (079)23220440<br></br>
                    Fax N0.- (079)23221419<br></br>
                    E-mail - gmc8gandhinagar@gmail.com
                </p>
            </div>



            
                    
               <div className="" style={{margin: "auto"}}>
                  <h6 className="text-center ms-3">Copyright @2022 All rights reserved</h6>
               </div>
           
        </div>


    );
}

export default Footer;
