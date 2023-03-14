import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../globals";

const initialPatientState = {
  firstName: "",
  lastName: "",
  birthday: "",
  gender: "",
  allergies: "",
  address: "",
  email: "",
  phoneNumber: "",
};

const NewPatient = () => {
  const [patient, setPatient] = useState(initialPatientState);
  const history = useHistory();

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancelClick = () => {
    history.push("/patients");
  };

  const addPatient = (e) => {
    const newPatient = {
      first_name: patient.firstName,
      last_name: patient.lastName,
      birthday: patient.birthday,
      gender: patient.gender,
      allergies: patient.allergies,
      address: patient.address,
      email: patient.email,
      phone_number: patient.phoneNumber,
    };

    e.preventDefault();

    fetch(`${baseUrl}/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPatient),
    })
      .then((r) => r.json())
      .then((data) => console.log(data));
    history.push("/patients");
  };

  return (
    <>
      <form onSubmit={addPatient}>
        <label htmlFor="firstName">First name: </label>
        <input
          id="firstName"
          type="text"
          value={patient.firstName}
          name="firstName"
          onChange={handleChange}
          autoFocus={true}
          required
        />
        <br />
        <label htmlFor="lastName">Last name: </label>
        <input
          id="lastName"
          type="text"
          value={patient.lastName}
          name="lastName"
          onChange={handleChange}
          autoFocus={true}
          required
        />
        <br />
        <label htmlFor="birthday">Date of birth: </label>
        <input
          id="birthday"
          type="date"
          name="birthday"
          value={patient.birthday}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="gender">Gender (at birth): </label>
        <select name="gender">
          <option></option>
          <option value={patient.gender}>Male</option>
          <option value={patient.gender}>Female</option>
        </select>
        <br />
        <label htmlFor="allergies">Allergies: </label>
        <input
          id="allergies"
          type="text"
          name="allergies"
          placeholder="N/A if no allergies..."
          value={patient.allergies}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="address">Home Address: </label>
        <input
          id="address"
          type="text"
          name="address"
          placeholder="Street, state, zip..."
          value={patient.address}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="text"
          name="email"
          value={patient.email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="phoneNumber">Phone #: </label>
        <input
          id="phoneNumber"
          type="text"
          name="phoneNumber"
          placeholder="000-000-0000"
          value={patient.phoneNumber}
          onChange={handleChange}
          required
        />
        <br />
        <input type="submit" value="Save" />
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default NewPatient;

// NOTES: ---------------------------------------------------------------------

// if (
//   [
//     patient.firstName,
//     patient.lastName,
//     patient.birthday,
//     patient.allergies,
//     patient.address,
//   ].some((val) => val.trim() === "")
// )
//   alert("Please fill in all of the information!");

// set up as a controlled form. when form submits, should be able to console log all the text fields.
// persist new patient on server. need to send server specifically formatted object.
// then use onAddPatient callback function to pass the new patient we get back from the server up to the parent component so we can add that new patient to state.
