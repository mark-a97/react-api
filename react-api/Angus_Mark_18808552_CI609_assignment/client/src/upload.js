import React, { Component } from 'react';
import axios from 'axios';

class Upload extends Component {


   
    constructor(props){
        super(props);
        this.state = {
            name: '',
            item: '',
            description: '',
            location: '',
            quantity: '',
            btnSubmit: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.btnTrue = this.btnTrue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.imageChange = this.imageChange.bind(this);     
    }


    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    btnTrue(){
        this.setState({
            btnSubmit: true
        })
    }

    // imageChange(e){
    //     this.setState({
    //         image: e.target.files[0],
    //     })
    // }


    uploadImage = async (e) => {
        const file = e.target.files[0]
        this.setState({
            image: await this.baseConvert64(file) //Gets the img and sets it to base64.
        });

       
    }

    baseConvert64=(file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader(); //Allows the reading of files stores on the users computer.
            fileReader.readAsDataURL(file) //Reads the files BLOB data then sets the data to a URL string.
            fileReader.onload = () => { //Once it is successfully read, fires the onLoad function
                resolve(fileReader.result); //Completes the base64 conversion
            };
            fileReader.onerror = (error) => { //Sends info on the error if there is one.
                reject(error);
            }
        });
    }


    onSubmit(e){
        const API_PATH = 'http://mra25.brighton.domains/ci609/assignment1/src/api.php';
     console.log(this.state);
   
        axios({
            method: 'post',
            url: API_PATH,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                    name: this.state.name,
                    item: this.state.item,
                    description: this.state.description,
                    location: this.state.location,
                    btnSubmit:  this.state.btnSubmit,
                    image: this.state.image,
                    quantity: this.state.quantity,
                }
                }, 
                )     
                .then(response => {
                    console.log("Data submitted: ", response);
                    // console.log(this.state.image);
                })
                .catch(error => {
                    console.log("Submition Err: ", error);
                })
                console.log("Submitted");
                e.preventDefault();
            }
       
   render() {


    return(
        <div>
            <h1>Upload</h1>

            <form onSubmit={this.onSubmit} className="userAuthentication">
                <h2>Upload Stuff</h2>
                <input type="text" id="name" name="name" placeholder="name.." required
                value={this.state.username}
                onChange={this.handleChange} /> <br/>

                <input type="text" id="item" name="item" placeholder="item.." required
                value={this.state.item}
                onChange={this.handleChange} /> <br/>

                <input type="text" id="quantity" name="quantity" placeholder="quantity" required
                value={this.state.quantity}
                onChange={this.handleChange} /> <br/>

                <input type="text" id="description" name="description" placeholder="description.." required
                value={this.state.description}
                onChange={this.handleChange} /> <br/>

                <input type="file" id="image" name="image" accept='image/*' required 
                onChange={this.uploadImage}
                
                />

                <input type="text" id="location" name="location" placeholder="location.." required
                value={this.state.location}
                onChange={this.handleChange} /> <br/>

                <input type="submit" value="Submit" className="form-btn" name="btnSubmit"
                onClick={this.btnTrue}/>
            
            </form>
</div>
        
    );
        
   }
}

export default Upload;