import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PatientCard from './PatientCard';


const PatientList = ({SearchPatient}) => {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/patients')
      .then(r => r.json())
      .then(data => setPatients(data))
  }, [])

  const patientCards = patients.map((patient) => <PatientCard key={patient.id} patient={patient} />)

  if (!patients) return <h2>Loading...</h2>;

  return (
    <div>
      <br />
      <h2>Patients</h2>
      <h4>{<NavLink to="/patients/new">+ Create</NavLink>}</h4>
      <p>{patientCards}</p>
    </div>
  );
}

export default PatientList