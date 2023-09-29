import React, { Component } from 'react';
import axios from 'axios';

// import {Redirect} from "react-router";
// import { connect } from 'react-redux';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    handleEmailChange(event) {
        this.setState({
            email: event.target.value,
        }, () => console.log(this.state));
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value,
        }, () => console.log(this.state));
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        try{
            await axios.post("http://localhost:8000/",{
                email,password
            })
            .then(res=>{
                if(res.data==="Found"){
                    this.props.history("/home",{state:{id:email}})
                }
                else if(res.data==="Does not exist"){
                    alert("User has not signed up yet")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })
        }
        catch(event){
            console.log(event);
        }
        // Handle form submission logic here
    }
    
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                <label>Email:</label>
                <input
                    type="Email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="Password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                    </div>
                    <button type="Submit">Login</button>
            </form>
        );
    }
}

export default LoginPage;