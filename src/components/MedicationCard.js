import React from 'react';
import { NavLink } from 'react-router-dom';

const MedicationCard = ({ medication, patient }) => {
  return (
    <li>
      <NavLink to={`/medications/${medication.id}`}>{medication.medication_name}</NavLink>
      <br />
    </li>
  );
}

export default MedicationCard