import React, { useState } from 'react';

const NewPatient = () => {
  const [name, setName] = useState("")

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const patientObject = {
      patient_name: name
    }
    fetch('http://localhost:9292/patients', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patientObject)
    })
      .then(r => r.json())
      .then(data => console.log(data))
  }

  const handleCancelClick = () => {
    console.log("cancelled")
  }

  return (
    <div>
      <h1>New Patient</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="patient-name">Name: </label>
          <input
            id="patient-name"
            type="text"
            value={name}
            onChange={handleChange}
            autoFocus={true}
          />
          <br />
          <input type="submit" value="Save" />
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default NewPatient