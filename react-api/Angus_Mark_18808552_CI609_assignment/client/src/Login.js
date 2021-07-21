import React, {Component} from 'react'
import './App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Home';


class Login extends Component {


    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            btnLogin: false,
            LoginErr: null
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.btnTrue = this.btnTrue.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        const API_PATH = 'http://mra25.brighton.domains/ci609/assignment1/src/api.php';
     console.log(this.state);
        

        axios({
            method: 'post',
            url: API_PATH,
            headers: {
                'content-type': 'application/json'
            },
            data: {
                    email: this.state.email,
                    password: this.state.password,
                    btnLogin: this.state.btnLogin }
                })
        
                .then(response => {
                    console.log("Login response: ", response);
                })
                .catch(error => {
                    console.log("login error: ", error);
                })
                console.log("Submitted");
                e.preventDefault();
        
    }

    btnTrue(){
        this.setState({
            btnLogin: true
        })
    }


    render() {
        return(
            
            <form onSubmit={this.onSubmit} className="userAuthentication">
                <h3>Login</h3>
            <input type="email" id="email" name="email" placeholder="email.."
            value={this.state.email}
            onChange={this.handleChange}/>

            <input type="password" id="password" name="password" placeholder="password.."
            value={this.state.password}
            onChange={this.handleChange}/><br/>

            

            <Link to="/register"><input type="button" value="Register" className="form-btn"/></Link>

            <input type="submit" value="Submit" className="form-btn"
            onClick={this.btnTrue}/>


            </form> 


    
            
            
        )
    }
}
export default Login;