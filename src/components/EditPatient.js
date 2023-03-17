import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const initialState = {
  first_name: "",
  last_name: "",
  allergies: "",
  address: "",
  email: "",
  phone_number: "",
};

const EditPatient = ({onUpdatePatient}) => {
  const [formData, setFormData] = useState(initialState);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:9292/patients/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setPatient(data);
        setFormData(data);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const key = e.target.name;
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const handleCancelClick = () => {
    history.push(`/patients/${id}`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    fetch(`http://localhost:9292/patients/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(r => r.json())
      .then(data => onUpdatePatient(data))
    
    history.push(`/patients/${id}`);
  };

  if (loading) {
    <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Edit Patient for </h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="first-name">First Name: </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />{" "}
          <label htmlFor="last-name">Last Name: </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="allergies">Allergies: </label>
          <input
            type="text"
            name="allergies"
            id="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="phoneNumber">Phone Number: </label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <br />
        <input type="submit" value="Update" />
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPatient;

// NOTES -----------------------------------------------------

// <h2>Edit Patient for {patient.firstName} {patient.lastName} </h2> = ERROR on LINE 62!

// Clicking the 'edit' button on a patient field should toggle between showing the EditPatient component, and the patient.

// When the EditPatient form is submitted, make a PATCH request to /patients/:id with an object update of the request:
// {
//   "patient": {
// {
//  "first_name": "edited first name"
//  "last_name": "edited last name"
//  "birthday": "edited birthday"
// }
//   }
// }

// Once you have successfully saved the edited patient on the server, find a way to update the patient in the web application as well. You should also change the PatientPage component state to leave 'editing' mode.

// For each feature, think about:
// - Do we need state?
//     - Where should that state live?
// - What props do I need?
// - How can I pass data to the components that need it?
// */
