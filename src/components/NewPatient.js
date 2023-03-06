import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const initialState = {
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
  const [patient, setPatient] = useState(initialState);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([patient.firstName, patient.lastName, patient.birthday, patient.email, patient.phoneNumber].some(val => val.trim() === "")) {
      alert("Please fill in all the required fields.")
    }

    const newPatient = {
      first_name: patient.firstName,
      last_name: patient.lastName,
      birthday: patient.birthday,
      gender: patient.gender,
      allergies: patient.allergies,
      address: patient.address,
      email: patient.email,
      phone_number: patient.phoneNumber,
    }

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

  return (
    <>
      <form onSubmit={handleSubmit}>
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

        <label htmlFor="gender">Gender(birth): </label>
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
          value={patient.phoneNumber}
          onChange={handleChange}
          required
        />
        <br />
        <input type="submit" value="Save" />
        <button onClick={handleCancelClick}>Cancel</button>
      </form>
    </>
  );
};

export default NewPatient;

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
