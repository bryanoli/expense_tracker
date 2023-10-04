import React from 'react';
import { useNavigate } from "react-router-dom"

function SignOutButton({ onSignOut }) {
    const navigate = useNavigate();
    const handleSignOut = () => {
      // Add sign-out logic here
      // For example, clear user authentication, JWT tokens, or cookies
  
      // Call the onSignOut function to notify the parent component
      navigate('/'); 
      if (onSignOut) {
        onSignOut();
      }
    };
  
    return (
      <button
      className="btn btn-danger"
      onClick={handleSignOut}>Sign Out</button>
    );
  }

export default SignOutButton;