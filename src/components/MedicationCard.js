import React from 'react';
// import { NavLink } from 'react-router-dom';

const MedicationCard = ({ medication }) => {
    return (
        <div>
            <img src={medication.image_url} alt="medication images" />
            <h5>{medication.medication_name}</h5>
            <h5>${medication.price}</h5>
            <br />
        </div>

    );
}



export default MedicationCard