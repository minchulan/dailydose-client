import React from 'react';
import { NavLink } from 'react-router-dom';

const MedicationCard = ({ medication }) => {
    return (
        <li>
            <NavLink to={`/medications/${medication.id}`}>{medication.medication_name}</NavLink>
        </li>
    );
}



export default MedicationCard