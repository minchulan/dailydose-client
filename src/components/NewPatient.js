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
        <label htmlFor="patient-first-name">First name: </label>
        <input
          id="patient-first-name"
          type="text"
          value={patient.first_name}
          name="patient-first-name"
          onChange={handleChange}
          autoFocus={true}
        />
        <br />
        <label htmlFor="patient-last-name">Last name: </label>
        <input
          id="patient-last-name"
          type="text"
          value={patient.last_name}
          name="patient-last-name"
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

        <label htmlFor="gender">Gender (birth): </label>
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
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="text"
          name="email"
          value={patient.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="phone-number">Phone #: </label>
        <input
          id="phone-number"
          type="text"
          name="phone-number"
          value={patient.phone_number}
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
