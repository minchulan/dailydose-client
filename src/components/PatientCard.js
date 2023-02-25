import React from 'react';
import { NavLink } from 'react-router-dom';

const PatientCard = ({ patient }) => {
    return (
        <li> 
            <NavLink to={`/patients/${patient.id}`}>
                {patient.patient_name}  
            </NavLink>  
        </li> 
    );

}

export default PatientCard