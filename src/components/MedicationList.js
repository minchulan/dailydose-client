import React, { useEffect, useState } from 'react';
import MedicationCard from './MedicationCard';
import { NavLink } from 'react-router-dom';

const MedicationList = () => {
  const [medications, setMedications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const medicationCards = medications.map((medication) => (
    <MedicationCard key={medication.id} medication={medication} />
  ));

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:9292/medications`)
      .then(r => r.json())
      .then(data => setMedications(data))
      .then(() => setLoading(false))
      .catch(setError)
  }, [])

  if (loading) return <h1>Loading...</h1>
  if (error)
    return <pre>{JSON.stringify(error)}</pre>
  if (!medications) return null;

  return (
    <div className="medications">
      <br />
      <h2>Medications</h2>
      <h4>{<NavLink to="/medications/new">+ New </NavLink>}</h4>
      <p>{medicationCards}</p>
    </div>
  );
}


export default MedicationList;