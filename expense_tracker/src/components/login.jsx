import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function LoginPage() {
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
            const response = await axios.post("http://localhost:8000/", {
                email,
                password
            });

            if (response.data === "Found") {
                alert("Login successful");
                navigate("/home", { state: { id: email } });
            } else if (response.data === "Does not exist") {
                alert("User has not signed up yet");
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
                <button type="submit" className='btn btn-primary'>Login</button>
            </form>
            <p>If you are not registered, please <a href="/signup">sign up</a></p>
        </div>
    );
}

export default LoginPage;