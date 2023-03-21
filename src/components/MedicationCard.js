import React from "react";
import { NavLink } from "react-router-dom";

const MedicationCard = ({ medication, patient, onMedicationDelete}) => {
  const { id, medication_name: medicationName } = medication;

  const handleDeleteClick = () => {
    fetch(`http://localhost:9292/medications/${id}`, {
      method: "DELETE"
    })
    onMedicationDelete(id)
  }
  
  return (
    <li>
      <NavLink to={`/medications/${id}`}>
        {medicationName}
      </NavLink>{" "}
      - <button onClick={handleDeleteClick}>Delete</button>
      <br />
    </li>
  );
};

export default MedicationCard