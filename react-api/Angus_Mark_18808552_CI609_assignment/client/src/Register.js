import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import './App';
import { Link } from 'react-router-dom';

class Register extends Component {


    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            btnRegister: false,
            registrationErrors: "",
            loggedIn: false,
        }
        this.registerSubmit = this.registerSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.btnTrue = this.btnTrue.bind(this);




    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    registerSubmit(e) {
        const API_PATH = 'http://mra25.brighton.domains/ci609/assignment1/src/api.php';
        axios({
            method: 'post',
            url: API_PATH,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                email: this.state.email,
                password: this.state.password,
                btnRegister: this.state.btnRegister,
            }
        },
        )
            .then(response => {
                console.log("Data submitted: ", response);



            })
            .catch(error => {
                console.log("Submition Err: ", error);
            })
        console.log("Submitted");
        e.preventDefault();
    }


    // axios.post(API_PATH, {

    //     user: {
    //     email: this.state.email,
    //     password: this.state.password
    //     }
    // })
    // .then(response => {
    //     console.log(response);
    //   }).catch(error => {
    //       console.log(error);
    //   })
    //         e.preventDefault();

    btnTrue() {
        this.setState({
            btnFeedback: true
        })
    }



    render() {
        return (
            <div>
                <form onSubmit={this.registerSubmit} className="userAuthentication">

                    <h3>Register</h3>
                    <input type="email" id="email" name="email" placeholder="email.."
                        value={this.state.email}
                        onChange={this.handleChange} />

                    <input type="password" id="password" name="password" placeholder="password.."
                        value={this.state.password}
                        onChange={this.handleChange} /><br />



                    <Link to="/login"><input type="button" value="Back" className="form-btn" /></Link>

                    <input type="submit" value="Submit" className="form-btn" name="btnRegister"
                        onClick={this.btnTrue} />

                </form>


            </div>

        )
    }
}
export default Register;