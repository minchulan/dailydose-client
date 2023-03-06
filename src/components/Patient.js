import React, { useState, useEffect } from 'react';
import MedicationCard from './MedicationCard';

const Patient = (props) => {
  console.log(props)
  const [patient, setPatient] = useState({
    medications: []
  });
  const [medicationFormFlag, setMedicationFormFlag] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:9292/patients/${props.match.params.id}`)
      .then(r => r.json())
      .then(data => setPatient(data))
  }, [])

  const medications = patient.medications.map((medication) => (
    <MedicationCard key={medication.id} medication={medication} />
  ));


  return (
    <div>
      <br />
      <h3>{patient.first_name} {patient.last_name}</h3>
      <h4>Medications:</h4>
      <br />
      {medications}
      <br />
    </div>
  );

}

export default Patient