import React, { useState, useEffect } from 'react';
import MedicationCard from "./MedicationCard";
import SearchMedication from './SearchMedication';

const MedicationList = () => {
  const [medications, setMedications] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:9292/medications`)
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
  };

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery)
  }

  const displayedMedications = medications.filter((medication) => medication.medication_name.toLowerCase().includes(query.toLowerCase()));

  
  const medicationCards = displayedMedications.map((medication) => (
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
      <SearchMedication
        onQueryChange={handleQueryChange}
      />
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