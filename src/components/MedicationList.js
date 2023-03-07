import React from 'react';
import MedicationCard from './MedicationCard';

const MedicationList = ({ medications }) => {
  const medicationCards = medications.map((medication) => (
    <MedicationCard key={medication.id} medication={medication} />
  ));

  return (
    <ul>
      {medicationCards}
    </ul>
  );
}

export default MedicationList;