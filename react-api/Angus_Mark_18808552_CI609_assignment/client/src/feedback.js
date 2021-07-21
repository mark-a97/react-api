import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import './Home';



class Feedback extends Component {


    constructor(props) {
        super(props)
        this.state = {
            submittionId: '',
            feedbackData: '',
            btnFeedback: false,

        }

        this.handleChange = this.handleChange.bind(this);
        this.feedbackSubmit = this.feedbackSubmit.bind(this);
        this.btnTrue = this.btnTrue.bind(this);

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    feedbackSubmit(e) {
        const API_PATH = 'http://mra25.brighton.domains/ci609/assignment1/src/api.php';
        axios({
            method: 'post',
            url: API_PATH,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                btnFeedback: this.state.btnFeedback,
                feedbackData: this.state.feedbackData,
                submittionId: this.state.submittionId,
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

    btnTrue() {
        this.setState({
            btnFeedback: true
        })
    }


    render() {
        return (
            <div>

                <form onSubmit={this.feedbackSubmit} className="userAuthentication">
                    <h1>Feedback</h1>
                    <input type="text" name="submittionId" placeholder="Enter ID" required
                        value={this.state.submittionId}
                        onChange={this.handleChange
                        }
                    />
                    <textarea id="textBox" name="feedbackData" placeholder="Enter Feedback" required
                        value={this.state.feedback}
                        onChange={this.handleChange}
                    />
                    <br />

                    <input type="submit" name="feedbackSubmit" className="form-btn"></input>
                </form>

            </div>



        )
    }
}
export default Feedback;