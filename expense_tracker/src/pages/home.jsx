import React from "react"
import { useLocation, useNavigate} from 'react-router-dom'
import SignOutButton from "../components/logout"
import Navbar from "../components/navbar"
import VirtualCreditCard from "../components/virtualcard"

function Home(){
    const cardData = {
        cardNumber: '1234 5678 9012 3456',
        expirationDate: '12/24',
        cardholderName: 'John Doe',
      };
    const location=useLocation()


    const handleSignOut = () => {
        // Add your sign-out logic here for the Home component
        // For example, clear user authentication, JWT tokens, or cookies specific to this component
        // Then, navigate to the desired location
        navigate('/');
    };

    return (
        <div className="Homepage">
            <Navbar/>{}
            <h1>Hello {location.state.id} and welcome to the hub</h1>
            <VirtualCreditCard{...cardData}/>
            <SignOutButton onSignOut={handleSignOut} />
        </div>
    )
}

export default Home
