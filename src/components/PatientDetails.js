import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import MedicationCard from './MedicationCard';
import { baseUrl } from '../globals';

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
        return <h1>Loading...</h1>
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
        <h2>
          {patient.first_name} {patient.last_name}{" "}
        </h2>
        <p>
          <NavLink to={`/patients/${patient.id}/edit`}>Edit Patient</NavLink>
        </p>
        <p>
          <NavLink to={`/patients/${patient.id}/medications/new`}>Create Medication</NavLink>
        </p>
        {medicationCards}
      </div>
    );
}

export default PatientDetails