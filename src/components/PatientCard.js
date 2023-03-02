import React from 'react';


const PatientCard = ({ patient }) => {
    return (
        <li>{patient.first_name} {patient.last_name}</li>
    );

}

export default PatientCard