import React, { useEffect, useState } from 'react';
import MedicationCard from './MedicationCard';
import { NavLink } from 'react-router-dom';

const MedicationList = () => {
  const [medications, setMedications] = useState([]);

  console.log(medications)

  useEffect(() => {
    fetch(`http://localhost:9292/medications`)
      .then(r => r.json())
      .then(data => setMedications(data))
  }, [])

  const medicationCards = medications.map((medication) => (
    <MedicationCard key={medication.id} medication={medication} />
  ));

  if (!medications) return <h2>Loading...</h2>

  return (
    <div>
      <br />
      <h2>Medications</h2>
      <h4>{<NavLink to="/medications/new">+ New </NavLink>}</h4>
      <p>{medicationCards}</p>
    </div>
  );
}

export default MedicationList;