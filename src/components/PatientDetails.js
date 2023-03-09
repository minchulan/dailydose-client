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
      const loadPatient = async () => {
          const resp = await fetch(`${baseUrl}/patients/${id}`)
          const data = await resp.json();
          
        setPatient(data);
        setLoading(false);
      }
    loadPatient();
  }, [id])
  
  if (loading) {
    return <h2>Loading...</h2>
  } else {

    const deleteMedication = async (id) => {
      await fetch(`${baseUrl}/medications/${id}`, {method: "DELETE"})
      removeMedication(id);
    }

    const removeMedication = id => {
      setPatient({
        ...patient,
        medications: patient.medications.filter(medication => medication.id !== id)
      })
    }
  }

  const medicationCards = patient.medications.map((medication) => (
    <MedicationCard
      key={medication.id}
      medication={medication}
      patient={patient} 
      />
  ));
    
    return (
      <div>
        <br />
        <h1>
          {patient.first_name} {patient.last_name}
        </h1>
        <p>
          <NavLink to={`/patients/${patient.id}/edit`}>
            ✏️ Edit Patient
          </NavLink>
          {" "} {" "}
          <NavLink to={`/patients/${patient.id}/medications/new`}>
            ✚ New Medication
          </NavLink>
        </p>
        <h3>
          Birthday: {patient.birthday} <br />
          Gender: {patient.gender}
        </h3>
        <h4>{patient.address}</h4>

        <h4>
          {patient.email} <br /> {patient.phone_number}
        </h4>
        <h5> Allergies: {patient.allergies}</h5>
        <hr />
        <h4>Current Medications</h4>
        <h5>{medicationCards}</h5>
      </div>
    );

}

export default PatientDetails