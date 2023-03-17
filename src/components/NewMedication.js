import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const initialMedicationState = {
  medicationName: "",
  thcStrength: "",
  cbdStrength: "",
  feelings: "",
  negatives: "",
  helpsWith: "",
  details: "",
  aka: "",
  imageUrl: ""
};

const NewMedication = ({onAddMedication}) => {
  const [patient, setPatient] = useState(null);
  const [med, setMed] = useState(initialMedicationState);
  const [loading, setLoading] = useState(true);
  const { patientId } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:9292/patients/${patientId}`)
      .then(r => r.json())
      .then(data => {
        setPatient(data);
        setLoading(false);
    })
  }, [patientId])

  if (loading) { <h2>Loading...</h2> };

  const handleChange = (e) => {
    setMed({
      ...med,
      [e.target.name]: e.target.value
    })
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/patients`);
  };

  const addMedication = (e) => {

    const newMedication = {
      medication_name: med.medicationName,
      aka: med.aka,
      thc_strength: med.thcStrength,
      cbd_strength: med.cbdStrength,
      feelings: med.feelings,
      negatives: med.negatives,
      helps_with: med.helpsWith,
      details: med.details,
      image_url: med.imageUrl,
    };
  
    e.preventDefault();

    fetch(`http://localhost:9292/patients/${patientId}/medications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMedication)
    })
      history.push(`/patients/${patientId}`)
  };

  return (
    <div>
      <h2>Create Medication for </h2>
      <form onSubmit={addMedication}>
        <div>
          <label htmlFor="medicationName">Name: </label>
          <input
            type="text"
            name="medicationName"
            placeholder="Strain name..."
            id="medicationName"
            value={med.medicationName}
            onChange={handleChange}
            className="input-text"
          />
          <br />
          <label htmlFor="aka">Alias: </label>
          <input
            type="text"
            name="aka"
            placeholder="Also known as..."
            id="aka"
            value={med.aka}
            onChange={handleChange}
            className="input-text"
          />
          <br />
          <label htmlFor="thcStrength">THC %: </label>
          <input
            type="number"
            name="thcStrength"
            placeholder="0"
            id="thcStrength"
            value={med.thcStrength}
            onChange={handleChange}
            className="input-text"
          />
          <br />
          <label htmlFor="cbdStrength">CBD %: </label>
          <input
            type="number"
            name="cbdStrength"
            placeholder="0"
            id="cbdStrength"
            value={med.cbdStrength}
            onChange={handleChange}
            className="input-text"
          />
          <br />
          <label htmlFor="feelings">Feelings: </label>
          <input
            type="text"
            name="feelings"
            placeholder="Relaxed · Happy"
            id="feelings"
            value={med.feelings}
            onChange={handleChange}
            className="input-text"
          />
          <br />
          <label htmlFor="negatives">Adverse Effects: </label>
          <input
            type="text"
            name="negatives"
            placeholder="Dry mouth · Anxious"
            id="negatives"
            value={med.negatives}
            onChange={handleChange}
            className="input-text"
          />
          <br />
          <label htmlFor="helpsWith">Helps with: </label>
          <input
            type="text"
            name="helpsWith"
            placeholder="Anxiety · Stress"
            id="helpsWith"
            value={med.helpsWith}
            onChange={handleChange}
            className="input-text"
          />
          <br />
          <label htmlFor="details">Details: </label>
          <input
            type="text"
            name="details"
            placeholder="Sativa-dominant strain..."
            id="details"
            value={med.details}
            onChange={handleChange}
            className="input-text"
          />
          <br />
          <label htmlFor="imageUrl">Image URL: </label>
          <input
            type="text"
            name="imageUrl"
            placeholder="Insert image url... "
            id="imageUrl"
            value={med.imageUrl}
            onChange={handleChange}
            className="input-text"
          />
          <br />
          <input type="submit" value="Save" />
          <button type="button" onClick={handleCancelClick}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default NewMedication


// NOTES: -----------------------------------------------------

// persist new medication on server
// then use onAddMedication to add medication to state 

  
  // /* <h2>Create Medication{patient.first_name} {patient.last_name}</h2> */ LINE 77 ERROR

  // history.push works....
  // how to pass up callback function to parent component NavLink ???
        // .then((r) => r.json())
      // .then(data => onAddMedication(data))
      