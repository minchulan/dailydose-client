import React from 'react';
import { NavLink } from 'react-router-dom';

const MedicationCard = ({ medication }) => {
    return (
        <div>
            <h5>Name: {medication.medication_name}</h5>
            <h5>Dose: {medication.dose} mg</h5>
            <h5>Form: {medication.form}</h5>
            <h5>Quantity: {medication.quantity}</h5>
            <h5>Price: {medication.price}</h5>
            <br />
        </div>

    );
}



export default MedicationCard