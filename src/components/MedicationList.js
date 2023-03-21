import React, { useState } from "react";
import MedicationCard from "./MedicationCard";
import SearchMedication from "./SearchMedication";

const MedicationList = ({ medications, setMedications }) => {
  const [query, setQuery] = useState("");

  const handleDeleteMedication = (id) => {
    const updatedMedications = medications.filter(
      (medication) => medication.id !== id
    );
    setMedications(updatedMedications);
  };

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  const displayedMedications = medications.filter((medication) =>
    medication.medication_name.toLowerCase().includes(query.toLowerCase())
  );

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
      <SearchMedication onQueryChange={handleQueryChange} />
      {medicationCards}
    </div>
  );
};

export default MedicationList;