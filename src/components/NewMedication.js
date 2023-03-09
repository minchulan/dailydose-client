import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { baseUrl } from '../globals';


const initialMedicationState = {
  medicationName: "",
  thcStrength: "",
  cbdStrength: "",
  feelings: "",
  negatives: "",
  helpsWith: "",
  details: "",
  aka: ""
};

const NewMedication = () => {
  const [patient, setPatient] = useState(null);
  const [med, setMed] = useState(initialMedicationState);
  const [loading, setLoading] = useState(true);
  const { patientId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const loadPatient = async () => {
      const resp = await fetch(`${baseUrl}/patients/${patientId}`)
      const data = await resp.json();
      setPatient(data);
      setLoading(false);
    }
    loadPatient();
  }, [patientId])

  if (loading) { <h2>Loading...</h2> };

  const handleChange = (e) => {
    setMed({
      ...med,
      [e.target.name]: e.target.value 
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json'
    }
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(med)
    }
    await fetch(`${baseUrl}/patients/${patientId}/medications`)

    history.push(`/patients/${patientId}`);
  }

  return (
    <div>
      <h2>
        Create Medication For {patient.first_name} {patient.last_name}{" "}
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="medication-name">Name: </label>
          <input
            type="text"
            name="medication-name"
            id="medication-name"
            value={med.medicationName}
            onChange={handleChange}
          />
          <label htmlFor="thc-strength">THC: </label>
          <input
            type="text"
            name="thc-strength"
            id="thc-strength"
            value={med.thcStrength}
            onChange={handleChange}
          />
          <label htmlFor="cbd-strength">CBD: </label>
          <input
            type="text"
            name="cbd-strength"
            id="cbd-strength"
            value={med.cbdStrength}
            onChange={handleChange}
          />
          <label htmlFor="feelings">Feels: </label>
          <input
            type="text"
            name="feelings"
            id="feelings"
            value={med.feelings}
            onChange={handleChange}
          />
          <label htmlFor="negatives">Side Effects: </label>
          <input
            type="text"
            name="negatives"
            id="negatives"
            value={med.negatives}
            onChange={handleChange}
          />
          <label htmlFor="helps-with">Helps with: </label>
          <input
            type="text"
            name="helps-with"
            id="helps-with"
            value={med.helpsWith}
            onChange={handleChange}
          />
          <label htmlFor="details">Details: </label>
          <input
            type="text"
            name="details"
            id="details"
            value={med.details}
            onChange={handleChange}
          />
          <label htmlFor="aka">aka: </label>
          <input
            type="text"
            name="aka"
            id="aka"
            value={med.aka}
            onChange={handleChange}
          />
          <input type="submit" value="Create Medication" />
        </div>
      </form>
    </div>
  );
}

export default NewMedication