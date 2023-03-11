import React, { useState, useEffect } from 'react';
import MedicationCard from "./MedicationCard";
import { baseUrl } from "../globals";
import SearchMedication from './SearchMedication';

const MedicationList = () => {
  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${baseUrl}/medications`)
      .then(r => r.json())
      .then(data => {
        setMedications(data);
        setFilteredMedications(data);
        setLoading(false);
      })
  }, [])

  if (loading) return <h2>Loading...</h2>;
  if (!medications) return null;

  const handleDeleteMedication = (id) => {
    const updatedMedications = medications.filter((medication) => medication.id !== id)
    setMedications(updatedMedications)
  }

  const handleSearch = (term) => {
    setFilteredMedications(medications.filter((medication) => medication.medication_name.toLowerCase().includes(term.toLowerCase())))
  };
  
  const medicationCards = filteredMedications.map((medication) => (
    <MedicationCard key={medication.id} medication={medication} patient={medication.patient} onMedicationDelete={handleDeleteMedication}  />
  ));

  return (
    <div>
      <h2>Medications</h2>
      <SearchMedication handleSearch={handleSearch} />
      {medicationCards}
    </div>
  );
}


export default MedicationList
