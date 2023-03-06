import React from 'react';
import { Link } from 'react-router-dom';

const PatientLink = ({patient}) => {
    return (
        <div>
            <Link to={`patients/${patient.id}`}>
                <h3>{patient.first_name} {patient.last_name}</h3>

            </Link>

        </div>
    )
    
}


export default PatientLink