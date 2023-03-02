import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PatientCard from './PatientCard';

const PatientList = ({SearchPatient}) => {
  const [patients, setPatients] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:9292/patients`)
      .then(r => r.json())
      .then(data => setPatients(data))
      .then(() => setLoading(false))
      .catch(setError)
  }, [])

  if (loading) return <h1>Loading...</h1>
  if (error)
    return <pre>{JSON.stringify(error)}</pre>
  if (!patients) return null;


  const patientCards = patients.map((patient) => (
    <PatientCard key={patient.id} patient={patient} />
  ));

  return (
    <div className="patients">
      <h2>Patients</h2>
      <h4>{<NavLink to="/patients/new">+ New </NavLink>}</h4>
      <ul>{patientCards}</ul>
    </div>
  );
}

export default PatientList