import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    
    const routeChange = () => {
        history.push('/patients');
    }

    return (
        <div>
            <br />
            <br />
            <h1>Patient & Medication Management</h1>
            <p>Easily manage your patients and their medications</p>
            <button onClick={routeChange}>Get started</button>
        </div>
    );
}

export default Home