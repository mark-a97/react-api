import React, { Component } from 'react';
import './grid.css';
import './App.css';
import NavBar from './NavBar';
import Home from "./Home";
import Login from "./Login";
import About from "./About";
import Contact from "./Contact";
import Register from "./Register";
import Upload from "./upload";
import Feedback from "./feedback";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//Imported pages and libraries

class App extends Component {

    constructor(props) {
        super();
        this.state = {
            // loggedIn: "Not_logged_in",
            // user: {}
            idSearch: '',
        }

    }


    // handleLogin(data){
    //     this.state = {
    //         loggedIn: "Logged_in",
    //         user: data.user
    //     }
    // }


    render() {
        return (
            <Router> {/* Sets a router to be able to direct to different pages */}

                <div id="wrapper">


                    <NavBar /> {/*Calls the Navbar.js*/}

                    <main>

                        <Switch>
                            <Route path="/feedback"> <Feedback /> </Route>
                            <Route path="/contact"> <Contact /> </Route>
                            <Route path="/about"> <About /></Route>
                            <Route path="/register"> <Register /> </Route>
                            <Route path="/login"> <Login /> </Route>
                            <Route path="/upload"> <Upload /></Route>
                            <Route path="/"> <Home /> </Route>

                           
                            {/* Gives a route path to load the different pages
                                Switch will go through these like a loop */}



                        </Switch>
                       


                    </main>

                    <div className="footer">
                    <small id ="footer">&copy; 2020, Mark Angus, Student Number: 18808552</small>
                    </div>

                </div>

            </Router>

        )
    }
}



export default App;