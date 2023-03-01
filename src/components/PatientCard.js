import React from 'react';


const PatientCard = ({ patient }) => {
    return (
        <ul>
            <br />
            <li>{patient.first_name} {patient.last_name}</li>
        </ul>

    );

}

export default PatientCard