import React, { useState, useEffect } from 'react';
import MedicationCard from "./MedicationCard";
import { baseUrl } from "../globals";
import SearchMedication from './SearchMedication';

const MedicationPage = () => {
  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const loadMedications = async () => {
      const resp = await fetch(`${baseUrl}/medications`)
      const data = await resp.json();
      setMedications(data);
      setFilteredMedications(data);
      setLoading(false);
    }
    loadMedications();
  }, [])

  if (loading) return <h1>Loading...</h1>;
  if (!medications) return null;

  const deleteMedication = (id) => {
    fetch(`${baseUrl}/medications/${id}`, {
      method: "DELETE"
    })
    removeMedication(id)
  }
  const removeMedication = (id) => {
    const updatedMedications = medications.filter(medication => medication.id !== id)
    setMedications(updatedMedications)
  };

  const handleSearch = (term) => {
    setFilteredMedications(medications.filter((medication) => medication.medication_name.toLowerCase().includes(term.toLowerCase())))
  };
  
  const medicationCards = filteredMedications.map((medication) => (
    <MedicationCard key={medication.id} medication={medication} patient={medication.patient} deleteMedication={deleteMedication} />
  ));

  return (
    <div>
      <h2>Medications</h2>
      <SearchMedication handleSearch={handleSearch} />
      {medicationCards}
    </div>
  );
}


export default MedicationPage
