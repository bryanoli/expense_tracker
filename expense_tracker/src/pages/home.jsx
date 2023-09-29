import React from "react"
import { useLocation, useNavigate} from 'react-router-dom'

function Home(){
    const location=useLocation()

    return (
        <div className="Homepage">
            <h1>Hello {location.state.id} and welcome to the hub</h1>
        </div>
    )
}

export default Home