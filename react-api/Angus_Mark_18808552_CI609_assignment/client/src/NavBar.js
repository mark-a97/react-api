import React, { Component } from 'react'
import './App.css';
import { Link } from 'react-router-dom';

class NavBar extends Component {


    state = { clicked: false } //Sets the state of clicked to false.

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked }) //Changes the state based on the current state when the function is called.
    }

    render() {
        return (
            <nav className='navBar'>
                <div className="logo"><Link to="/">Stuff Share</Link></div>
                <div className='burger-icon' onClick={this.handleClick}> {/*Links to the clicked state */}
                    <i className="fas fa-bars burger"></i>
                </div>

                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}> {/*Changes the class when the burger menu is clicked*/}

                    <Link to="/"><li className="nav-links">Home</li></Link>
                    <Link to="/upload"><li className="nav-links">Upload</li></Link>
                    <Link to="/login"><li className="nav-links">Login</li></Link>
                    <Link to="/about"><li className="nav-links">About</li></Link>
                    <Link to="/contact"><li className="nav-links">Contact</li></Link>
                    {/* Redirects you to the linked page once clicked. */}
                </ul>

            </nav>
        )
    }
}
export default NavBar;