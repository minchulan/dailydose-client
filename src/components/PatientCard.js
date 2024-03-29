import React from "react";
import { NavLink } from "react-router-dom";

const PatientCard = ({ patient, onPatientDelete }) => {
  const { id, first_name: firstName , last_name: lastName } = patient;

  const handleDeleteClick = () => {
    fetch(`http://localhost:9292/patients/${id}`, {
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

export default PatientCard