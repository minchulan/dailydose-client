import React, { useEffect, useState } from 'react';
import MedicationCard from './MedicationCard';
import { NavLink } from 'react-router-dom';

const MedicationList = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:9292/medications`)
      .then(r => r.json())
      .then(data => console.log(data))
  }, [])

  const medicationCards = medications.map((medication) => (
    <MedicationCard key={medication.id} medication={medication.medication_name} />
  ));

  if (!!loading) return <h2>Loading...</h2>

  return (
    <div>
      <h2>Medications</h2>
      <h4>{<NavLink to="/medications/new">Add Medication</NavLink>}</h4>
      <p>{medicationCards}</p>
    </div>
  );
}

export default MedicationList;