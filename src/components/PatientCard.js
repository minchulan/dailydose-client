import React from "react";
import { Nav } from "react-bootstrap";
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

export default PatientCard;


// NOTES: -------------------------------------------------------------------
// when the delete button is clicked, make a DELETE request to /patients/:id. Also, remove the patient from the PatientList.


// patients_controller.rb: 
    // delete '/patients/:id' do 
    //     @patient = Patient.find_by_id(params[:id])
    //     if @patient
    //         @patient.destroy 
    //     else  
    //         { errors: ["Patient Doesn't Exist"] }.to_json
    //     end 
    // end 