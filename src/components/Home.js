import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    
    const routeChange = () => {       
        history.push('/login');
    }
        
    return (
        <div className="home">
            <h1>The Pharmacy that really delivers</h1>
            <p>With transparent pricing. Easy refills. Even savings for Loyalty members.</p>
            <br />
            <button onClick={routeChange}>Get started</button>
        </div>
    );
}

export default Home