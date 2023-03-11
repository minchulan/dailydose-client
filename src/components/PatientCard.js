import React from "react";
import { NavLink } from "react-router-dom";
import { baseUrl } from "../globals";

const PatientCard = ({ patient, onPatientDelete }) => {
  const { id, first_name: firstName , last_name: lastName } = patient;

  const handleDeleteClick = () => {
    fetch(`${baseUrl}/patients/${id}`, {
      method: "DELETE"
    })
    onPatientDelete(id)
  };

  return (
    <li>
      <NavLink to={`/patients/${id}`}>{firstName} {lastName}</NavLink> - <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
};

export default PatientCard;

// when the delete button is clicked, make a DELETE request to /patients/:id. Also, remove the patient from the PatientList.
