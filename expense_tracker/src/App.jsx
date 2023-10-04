// import './App.css'
// import {useEffect,useState } from 'react'
import axios from "axios";
import LoginPage from './components/login';
import SignupPage from './components/signup';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { usePlaidLink } from 'react-plaid-link';
// import reactLogo from './assets/react.svg'

axios.defaults.baseURL = "http://localhost:8000"

const cardData = {
    cardNumber: '1234 5678 9012 3456',
    expirationDate: '12/24',
    cardholderName: 'John Doe',
  };

function App(){
    return (
        <div className='App'>
            <Router>
                <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/home" element={<Home/>}/>
                </Routes>
            </Router>
        </div>
    )
}


export default App
