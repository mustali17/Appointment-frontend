import React, { useContext } from "react";
import { Link, /*NavLink,*/ useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../image/logobymanan.jpeg";
import { AuthContext } from "../Auth/AuthContext";
import axios from "axios";
// import { Nav } from "react-bootstrap";
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements";
// import GoogleLogin from "react-google-login";
// import axios from "axios";
import Image from "../image/7566.jpg";
import { size } from "lodash";


const Navbar = () => {
  const { token, setToken, setGoogleId } = useContext(AuthContext);
  const history = useHistory();

  async function loginWithGoogle(e) {
    try {
      await window.gapi.auth2.getAuthInstance().signIn();
      const auth2 = await window.gapi.auth2.getAuthInstance();
      if (auth2.isSignedIn.get()) {
        console.log("[Google] Signed in successfully!");
        var profile = auth2.currentUser.get();
        console.log(profile);
        window.localStorage.setItem("token", profile.getAuthResponse().id_token);
        window.localStorage.setItem("googleId", profile.getId());

        const serverRes = await axios.post(
          `http://localhost:5000/citizens/google-login/`,
          {
            tokenId: profile.getAuthResponse().id_token,
          }
        );

        if (serverRes) {
          console.log(serverRes.data.phoneNumberExists);

          setToken(profile.getAuthResponse().id_token);
          setGoogleId(profile.getId());

          if (serverRes.data.phoneNumberExists === true) {
            history.push("/citizen");
          } else {
            history.push("/citizen/update-phone");
          }
        }
        else {
          const err = {err : "Server Didn't respond"}
          throw err;
        }
      }
    } catch (err) {
      console.log(`[Google] Some error occurred while signing in! ${JSON.stringify(err)}`);
    }
  }

  function signOutGoogle() {
    // Different logic for officer and citizen

    // citizen logic
    if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      window.gapi.auth2.getAuthInstance().signOut().then(() => {
        console.log("[Google] Signed out successfully!");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("googleId");
        setToken(null);
        setGoogleId(null);
        history.push("/");
      }).catch((err) => {
        console.log(`[Google] Some error occurred while signing out! ${err}`);
      });
    }

    // officer logic
    else {
      window.localStorage.removeItem("token");
      console.log("[officer] Signed out successfully!");
      setToken(null);
      history.push("/");
    }
  }
  return(
    <>
    <Nav>
     
      <NavLink to='/'>
      <img src={logo}  width="70" height="50" alt="logo" style={{marginRight:"5px"}} />
       <span style={{fontFamily:"inherit" , fontSize:"25px", color:"black"}}>Gandhinagar Muncipal Corporation</span>
      </NavLink>
     <Bars />
      <NavBtn>
         {!token && (
        <button
                onClick={loginWithGoogle}
                className="btn btn-primary"
              >
                Login
              </button>
            )}
            {token && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={signOutGoogle}
              >
                Logout
              </button>
            )}
       
      </NavBtn>
    </Nav>
    </>
  );


  // return (
  //   <nav
  //     className="navbar navbar-dark bg-dark navbar-expand-lg pl-4 pr-4 w-100 "
  //     style={{ backgroundColor: " #1a1a1a" }}
  //   >
  //     <Link to="/" className="navbar-brand">
  //       <img
  //         src={logo}
  //         alt=""
  //         width="30"
  //         height="24"
  //         className="d-inline-block align-top mr-2 mt-1"
  //       ></img>
  //       Gandhinagar Muncipal Corporation 
  //     </Link>
  //     <button
  //       className="navbar-toggler"
  //       type="button"
  //       data-toggle="collapse"
  //       data-target="#collapsibleNavbar"
  //     >
  //       <span className="navbar-toggler-icon"></span>
  //     </button>
  //     <div className="collapse navbar-collapse " id="collapsibleNavbar">
  //       <ul className="navbar-nav ml-auto text-light bg-dark">
  //         <li className="navbar-item" style={{ textAlign: "right" }}>
  //           <link to="/" className="nav-link " style={{ padding: 0 }} />
  //           {!token && (
  //             <button
  //               onClick={loginWithGoogle}
  //               className="btn btn-outline-primary"
  //             >
  //               Login
  //             </button>
  //           )}
  //           {token && (
  //             <button
  //               type="button"
  //               className="btn btn-outline-primary"
  //               onClick={signOutGoogle}
  //             >
  //               Logout
  //             </button>
  //           )}
  //         </li>
  //       </ul>
  //     </div>
  //   </nav>
  // );
}

export default Navbar;
