import React from "react";
import { NavLink } from "react-router-dom";
import { baseUrl } from "../globals";

const MedicationCard = ({ medication, patient, onMedicationDelete}) => {
  const { id, medication_name: medicationName } = medication;

  const handleDeleteClick = () => {
    fetch(`${baseUrl}/medications/${id}`, {
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

export default MedicationCard;
