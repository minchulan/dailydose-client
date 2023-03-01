import React from 'react';
import { useHistory } from 'react-router-dom';

const HowItWorks = () => {
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        history.push("/login")
    };

    return ( 
        <div>
            <h1>We bring the pharmacy to you</h1>   
            <p>With low prices on medication, free delivery, and pharmacists on-call 24/7</p>     
            <br />    
            <button onClick={handleClick}>Get started</button>    
        </div>            
    )   
}


export default HowItWorks