import React, { useState, useEffect } from 'react';
import { baseUrl } from "../globals";
import MedicationCard from "./MedicationCard";
import SearchMedication from './SearchMedication';

const MedicationList = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${baseUrl}/medications`)
      .then(r => r.json())
      .then(data => {
        setMedications(data);
        setLoading(false);
      })
  }, [])

  if (loading) return <h2>Loading...</h2>;
  if (!medications) return null;

  const handleDeleteMedication = (id) => {
    const updatedMedications = medications.filter((medication) => medication.id !== id)
    setMedications(updatedMedications)
  }

  const handleSearchMedication = (term) => {
    const filteredMedicationResults = medications.filter((medication) => medication.medication_name.toLowerCase().includes(term.toLowerCase()));
    setMedications(filteredMedicationResults)
  };
  
  const medicationCards = medications.map((medication) => (
    <MedicationCard
      key={medication.id}
      medication={medication}
      patient={medication.patient}
      onMedicationDelete={handleDeleteMedication}
    />
  ));

  return (
    <div>
      <h2>Medications</h2>
      <SearchMedication handleSearchMedication={handleSearchMedication} />
      {medicationCards}
    </div>
  );
}

export default MedicationList;



// NOTES --------------------------------------------------------
  // const handleAddMedication = (newMedication) => {
  //   const updatedMedications = [...medications, newMedication]
  //   setMedications(updatedMedications);
  // };