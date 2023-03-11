import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MedicationCard from './MedicationCard';
import { baseUrl } from '../globals';
import { NavLink } from 'react-router-dom';

const PatientDetails = () => {
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${baseUrl}/patients/${id}`)
      .then(r => r.json())
      .then(data => {
        setPatient(data);
        setLoading(false);
    })
  }, [id])

  if (loading) return <h2>Loading....</h2>;

  const deleteMedication = (id) => {
    fetch(`${baseUrl}/medications/${id}`, {
      method: "DELETE"
    })
    removeMedication(id);
  }

  const removeMedication = (id) => {
    setPatient({
      ...patient,
      medications: patient.medications.filter(
        (medication) => medication.id !== id
      ),
    });
  };

  const medicationCards = patient.medications.map((medication) => (
    <MedicationCard
      key={medication.id}
      medication={medication}
      patient={patient} 
      onMedicationDelete={deleteMedication}
      />
  ));
    
    return (
      <div className="actions">
        <br />
        <p>
          <NavLink to={`/patients/${patient.id}/edit`}>✏️ Edit Patient</NavLink>
          ⎮
          <NavLink to={`/patients/${patient.id}/medications/new`}>
            ✚ New Medication
          </NavLink>
        </p>
        <h2>
          {patient.first_name} {patient.last_name}
        </h2>
        <h4>
          Birthday: {patient.birthday} <br />
        </h4>
        <h5>Gender: {patient.gender}</h5>
        <h5>Address: {patient.address}</h5>
        <h5> Allergies: {patient.allergies}</h5>
        <h5>
          📧 {patient.email} ⎮ ✆ {patient.phone_number}
        </h5>
        <hr />
        <h4>Current Medications</h4>
        <h5>{medicationCards}</h5>
      </div>
    );

}

export default PatientDetails