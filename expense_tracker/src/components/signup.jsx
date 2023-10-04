import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
// import {Redirect} from "react-router";
// import { connect } from 'react-redux';


function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/signup", {
                email,
                password
            });

            if (response.data === "Found") {
                alert("User already exists");
            } else if (response.data === "Does not exist") {
                alert("User has not signed up yet");
                navigate("/home", { state: { id: email } });
            }
        } catch (error) {
            alert("Wrong details");
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label'>Email:</label>
                    <input
                        type="email"
                        className='form-control'
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label className='form-label'>Password:</label>
                    <input
                        type="password"
                        className='form-control'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit" className='btn btn-primary'>Sign up</button>
            </form>
            <p>If you are not registered, please <a href="/">Login</a></p>
        </div>
    );
}

export default SignupPage;