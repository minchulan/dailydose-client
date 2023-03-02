import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const NewMedication = ({onAddNewMedication}) => {
  const [medicationName, setMedicationName] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    setMedicationName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const medicationObject = { medication_name: medicationName }

    fetch("http://localhost:9292/medications", { 
      method: "POST",
      headers: {   
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(medicationObject), 
    })
      .then((r) => r.json())
      .then((data) => onAddNewMedication(data.medication_name))
    
    history.push("/medications")
  }

  return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="medication name">Name: </label>
          <input type="text" id="medication name" value={medicationName} onChange={handleChange} autoFocus={true} />
          <input type="submit" value="Create Medication" />
        </div>
      </form>
  )
}

export default NewMedication