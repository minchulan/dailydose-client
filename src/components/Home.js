import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    
    const routePatientChange = () => { 
        history.push('/patients')
    }

    const routeMedicationChange = () => {
        history.push("/medications/");
    };
        
    return (
        <div className="home">
            <br />
            <h3>Patient & Medication Management</h3>
            <button onClick={routePatientChange}>Manage Patients</button>
            <br />
        <button onClick={routeMedicationChange}>Manage Rx Savings</button>
      </div>
    );
}

export default Home