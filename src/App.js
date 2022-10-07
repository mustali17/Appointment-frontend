/* global gapi */
import React, { useEffect, useState } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import officerLogin from "./Pages/officerLogin";   // done
import officerDashboard from "./Pages/officerDashboard"; // done
import citizenDashboard from "./Pages/citizenDashboard";
import Error from "./Pages/Error";
import { AuthContext } from "./Auth/AuthContext";
import PhoneNumber from "./components/PhoneNumber";
import PersonalDetails from "./officer/PersonalDetails";
import Addoff from "./officer/Addoff";
import Searchofficer from "./citizen/Searchofficer";
import PerviousAppointments from "./citizen/PerviousAppointments";
import Spinner from "react-bootstrap/Spinner";
import Selectdate from "./citizen/Selectdate";
import BookingSlots from "./officer/BookingSlots";
import Payment from "./citizen/Payment";
import OffAppointments from "./officer/PaymentHistory";
import AppointmentStatus from "./citizen/AppointmentStatus";
import Pfeedback from './citizen/Feedback';
import FeedbackDetails from './officer/FeedbackDetails';

function App() {
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const [googleId, setGoogleId] = useState(
		window.localStorage.getItem("googleId")
	);

	const [apiLoaded, setApiLoaded] = useState(false);

	// To load only when gapi is loaded
	useEffect(() => {
		if (window.gapi !== undefined) {
			console.log("365803515308-boj1rpek38kabo6pm4448b869efoe47q.apps.googleusercontent.com");
			setApiLoaded(false);
			window.gapi.load("client:auth2", initClient);
			function initClient() {
				window.gapi.client
					.init({
						apiKey: 'AIzaSyAJO5wNT_dy2zKYt2Px7ZGvd2tLGyUA6QY',
						clientId: '481356034792-uu4ksedf4tuabnsobb3k27qle8e5mkm5.apps.googleusercontent.com',
						discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
						scope: 'https://www.googleapis.com/auth/calendar',
						plugin_name: "chat"
					})
					.then(
						function () {
							if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
								console.log(
									`Is signed in? ${window.gapi.auth2
										.getAuthInstance()
										.isSignedIn.get()}`
								);
							} else {
								console.log("Currently Logged Out!!");
							}
							setApiLoaded(true);
						},
						function (error) {
							console.log(`error ${JSON.stringify(error)}`);
							setApiLoaded(true);
						}
					);
			}
			setApiLoaded(true);
		} else {
			console.log("[Google] inside the else block line 54 App.js");
			setApiLoaded(false);
		}

	}, []);

	return apiLoaded ? (
		<Router>
			<AuthContext.Provider value={{ token, setToken, googleId, setGoogleId }}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/officerLogin" component={officerLogin} />
					<Route exact path="/officer" component={officerDashboard} />
					<Route exact path="/citizen/searchofficer" component={Searchofficer} />
					<Route exact path="/citizen" component={citizenDashboard} />
					<Route exact path="/citizen/update-phone" component={PhoneNumber} />
					<Route
						exact
						path="/citizen/previousappointments"
						component={PerviousAppointments}
					/>
					<Route
						exact
						path="/officer/perosnaldetails"
						component={PersonalDetails}
					/>
					<Route
						exact
						path="/officer/payment-history"
						component={OffAppointments}
					/>
					<Route exact path="/officer/feedback/:id" component={FeedbackDetails} />
					<Route exact path="/citizen/selectdate" component={Selectdate} />
					<Route exact path="/citizen/book-slot" component={BookingSlots} />
					<Route exact path="/citizen/payment" component={Payment} />
					<Route exact path="/citizen/appointment-status" component={AppointmentStatus} />
					<Route exact path="/citizen/feedback/:id" component={Pfeedback} />
					<Route exact path="/officer/addoff" component={Addoff} />

					<Route path="*">
						<Error />
					</Route>
				</Switch>
			</AuthContext.Provider>
		</Router>
	) : (
		<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
			<Spinner animation="border" variant="danger" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</div>
	);
}

export default App;
