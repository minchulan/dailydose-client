import React from "react";
import { NavLink } from "react-router-dom";

const PatientCard = ({ patient, deletePatient }) => {
  return (
    <li>
      <NavLink to={`/patients/${patient.id}`}>{patient.first_name} {patient.last_name}</NavLink> - <button onClick={() => deletePatient(patient.id)}>Delete</button>
    </li>
  );
};

export default PatientCard;
