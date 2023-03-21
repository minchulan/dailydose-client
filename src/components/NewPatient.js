import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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

const NewPatient = ({ onAddPatient }) => {
  const [patient, setPatient] = useState(initialPatientState);
  const history = useHistory();

  const addPatient = (e) => {
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

    fetch(`http://localhost:9292/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPatient),
    })
      .then((r) => r.json())
      .then((data) => onAddPatient(data));

    history.push("/patients");
  };

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancelClick = () => {
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
          placeholder="First name"
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="lastName">Last name: </label>
        <input
          id="lastName"
          type="text"
          value={patient.lastName}
          name="lastName"
          placeholder="Last name"
          onChange={handleChange}
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
          placeholder="name@email.com"
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

// patients_controller.rb:
// post '/patients' do
//     @patient = Patient.new(params)
//     if @patient.save
//         @patient.to_json
//     else
//         { errors: @patient.errors.full_messages.to_sentences }.to_json
//     end
// end

// line 39:     // this should be enough to insert something to database (after passing validation).
// when it's done, send me away to the patientList page.
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
