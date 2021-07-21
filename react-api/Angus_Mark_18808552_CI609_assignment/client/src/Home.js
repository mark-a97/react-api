import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends Component {



    constructor(props) {
        super(props);
        this.state = {
            getName: '',
            getDescription: '',
            getImage: '',
            getItem: '',
            getLocation: '',
            getData: [],
            getFeedback: 'None submitted yet',

            text: '',

            idSearch: '',
            btnPickup: false,
            showFeedbackBtn: false, //setting the states of variables so they can be used throughout the page

        }
        // this.onSubmit = this.onSubmit.bind(this);
        this.btnTrue = this.btnTrue.bind(this);
        this.searchBtn = this.searchBtn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.pickupBtn = this.pickupBtn.bind(this); //bind takes the components state and updates it appropriately

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value //Setting the state when called, for example updating the state of a text field
        })
    }


    btnTrue() {
        this.setState({
            btnPickup: true, //setting btnPickup to true once this function is called.

        })
    }



    searchBtn(e) {
        e.preventDefault();
        const API_PATH = 'http://mra25.brighton.domains/ci609/assignment1/src/api.php'; //const containing the link to the database.


        axios.get(API_PATH) //opening the GET connection to the database


            .then(resp => { //If the connection is successful, pass the parameter response and continue running the code.
                console.log(resp.data); //logging the data recieved.

                this.setState({
                    // data: JSON.parse(resp.data),
                    getData: resp.data, //setting the data returned into the getData[] array.
                    // getID: resp.data[0].id,
                    // getName: resp.data[0].name,
                    // getItem: resp.data[0].item,
                    // getDescription: resp.data[0].description,
                    // getImage: resp.data[0].image,
                    // getLocation: resp.data[0].location,

                });

            })

            .catch(error => {
                console.log("GET Err: ", error); //If any errors with the GET, this error will output.
            })

    }

    pickupBtn(e) {
        const API_PATH = 'http://mra25.brighton.domains/ci609/assignment1/src/api.php';
        e.preventDefault(); //Prevent the default submit button from refreshing the page.

        axios({
            method: 'post', //similar to the method above, apart from this time using POST.
            url: API_PATH,  //path that links to the database.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', //Setting the information as JSON data.
            },
            data: {
                btnPickup: this.state.btnPickup, //Setting these two states to 'data'
                idSearch: this.state.idSearch,
            }
        },
        )
            .then(response => {
                console.log("Data submitted: ", response); //Log the success message.
                this.setState({ showFeedbackBtn: true })

            })
            .catch(error => {
                console.log("Submition Err: ", error); //catch the error.
            })
        console.log("Item claimed");
                                   
    }


    render() {

        return (
            <div>
                <h1>Browse</h1>
                <form onSubmit={this.pickupBtn}> {/* Calls the pickupBtn function  */}
                    <input type="text" id="idSearch" name="idSearch" placeholder="Search the item ID you want..." required
                        value={this.state.idSearch}  // Sets the value of idSearch when something is typed in
                        onChange={this.handleChange} />


                    <input type="submit" value="Pickup" className="form-btn" name="btnPickup"
                        onClick={this.btnTrue}
                    />
                    <br />
                    {this.state.showFeedbackBtn &&
                        <Link to={'/feedback'}> <button
                            onClick={this.feedbackPage} className="form-btn">
                            Feedback Here
                </button></Link>
                        // Creates a button on the page, once this button is clicked it uses <Link> to redirect the user
                        // To the feedback page.

                    }
                    <br />
                    <button className="form-btn" name="searchBtn" onClick={this.searchBtn}>Search</button>
                </form>



                <div>

                    <ol className="cards"> {/* List with a set class to contain the cards */}
                        {this.state.getData.map((data) => { //Maps over the getData[] array to return all the information set from the axios GET
                            return (

                                //Every element below is created depending on the information retrieved from the database.
                                //It will print out below the information starting from the ID, down to the feedback
                                //In the element tags <li> and <p>. The divs seperate the data and allow it to be
                                //more organised.

                                <li className="card">
                                    <div className="cardContent">
                                        <div className="cardTop">
                                            <p>ID: {data.id}</p>
                                            <p>Name: {data.name} </p>
                                            <p>Item: {data.item} </p>
                                        </div>
                                        <p className="cardImg"><img src={data.image} alt="Card" /> </p>
                                        <div className="cardBottom">
                                            <p> Description: {data.description} </p>
                                            <p>Location: {data.location} </p>
                                            <p>Available: {data.available}</p>
                                            <p>Feedback: {data.feedback}</p>
                                        </div>

                                    </div>
                                </li>
                            )
                        })}

                    </ol>






                </div>

            </div>

        );

    }
}

export default Home;