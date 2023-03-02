import React from 'react';
import MedicationCard from './MedicationCard';

const MedicationList = ({ medications, onDeleteMedication, onAddNewMedication, onUpdateMedication }) => {
  

  const medicationCards = medications.map((medication) => (
    <MedicationCard key={medication.id} medication={medication} onDeleteMedication={onDeleteMedication} onAddNewMedication={onAddNewMedication} onUpdateMedication={onUpdateMedication} />
  ));

  return (
    <ul>
      {medicationCards}
    </ul>
  );
}

export default MedicationList;