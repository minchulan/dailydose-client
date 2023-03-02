import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    
    const routePatientChange = () => { 
        history.push('/patients/new')
    }

    const routeMedicationChange = () => {
        history.push("/medications/new");
    };
        
    return (
        <div className="home">
            <br />
            <h3>Patient & Medication Management</h3>
            <button onClick={routePatientChange}>Create Patient</button>
        <button onClick={routeMedicationChange}>Create Medication</button>
      </div>
    );
}

export default Home