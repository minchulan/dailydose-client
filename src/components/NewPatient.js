import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const initialState = {
  patient_name: "",
  date_of_birth: "",
  gender: "",
  allergies: "",
  address: "",
  phone_number: "",
};

const NewPatient = () => {
  const [patient, setPatient] = useState(initialState);
  const history = useHistory();

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      [patient.name, patient.birthday, patient.allergies, patient.address].some(
        (val) => val.trim() === ""
      )
    )
      alert("Please fill in all of the information!");

    const newPatient = {
      patient_name: patient.name,
      date_of_birth: patient.birthday,
      gender: patient.gender,
      allergies: patient.allergies,
      phone_number: patient.phoneNumber,
    };

    fetch("http://localhost:9292/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPatient),
    })
      .then((r) => r.json())
      .then((data) => setPatient(data));
    history.push("/patients");
  };

  const handleCancelClick = () => {
    console.log("cancelled");
  };

  return (
    <>
      <h1>New Patient</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="patient-name">Name: </label>
        <input
          id="patient-name"
          type="text"
          value={patient.name}
          name="name"
          onChange={handleChange}
          autoFocus={true}
        />
        <br />
        <label htmlFor="birthday">Date of birth: </label>
        <input
          id="birthday"
          type="date"
          name="birthday"
          value={patient.birthday}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="gender">Gender at birth: </label>
        <select name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <br />
        <label htmlFor="allergies">Allergies: </label>
        <input
          id="allergies"
          type="text"
          name="allergies"
          value={patient.allergies}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="address">Home Address: </label>
        <input
          id="address"
          type="text"
          name="address"
          value={patient.address}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="phone-number">Phone #: </label>
        <input
          id="phone-number"
          type="text"
          name="phone-number"
          value={patient.phoneNumber}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Save" />
        <button onClick={handleCancelClick}>Cancel</button>
      </form>
    </>
  );
};

export default NewPatient;
