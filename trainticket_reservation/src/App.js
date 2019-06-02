import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import logo from "./images/logo.jpg";
import train from "./images/TrainPic.jpg";
import SignUp from "./components/signup.component";
import Login from "./components/login.component";
import Profile from "./components/profile.component";
import TrainReservation from './components/trainReservation.component';
import DialogPayment from './components/dialogPayment.component';
import SampathPayment from './components/sampathPayment.component';

class App extends Component {

    render() {

        return (

            <Router>
                <div className="container">

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="http://google.com" target="_blank">
                            <img src={logo} width="30" height="30"alt="CodingTheSmartWay.com"/>
                        </a>
                        <Link to="/" className="navbar-brand">Train Ticket Reservation</Link>

                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">Sign Up</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/profile" className="nav-link">Profile</Link>
                                </li>
                            </ul>
                        </div>

                    </nav>

                    <br/>

                    <div className="card text-center">
                        <div className="card-body">
                            <img src={train} className="img-fluid" alt="Responsive image" style={{paddingBottom : 20}}/>
                            <h2 className="display-4 mb-3">Reserve Your Train Ticket Today</h2>
                        </div>
                    </div>

                    <br/>
                    <Route path="/" exact component={SignUp}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/trainTicketReservation" component ={TrainReservation}/>
                    <Route path="/dialogPayment" component={DialogPayment}/>
                    <Route path="/sampathPayment" component={SampathPayment}/>
                </div>
            </Router>

        );
    }

}

export default App;
