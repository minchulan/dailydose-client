import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    const routePatientChange = () => {
        history.push('/patients')
    };
    
    const routeMedicationChange = () => {
        history.push("/medications/");
    };
        
    return (
        <div className="home">
            <br />
            <h3>Patient & Medication Management for Cannabis Practitioners</h3>
            <button onClick={routePatientChange}>Patient Management</button>
            <br />
        <button onClick={routeMedicationChange}>Medication Management</button>
      </div>
    );
}

export default Home