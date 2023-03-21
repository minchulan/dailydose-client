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

const EditPatient = ({ onUpdatePatient }) => {
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
      .then((r) => r.json())
      .then((data) => onUpdatePatient(data));

    history.push(`/patients/${id}`);
  };

  if (loading) {
    <h2>Loading...</h2>;
  }

  return (
    <div>
      <hr />
      <h3>Edit Patient for {formData.first_name} {formData.last_name}</h3>
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

// Ask Nancy:
// making another fetch request to /patients/:id
// line 79:
// <h2>Edit Patient for {patient.firstName} {patient.lastName}</h2>

// here we are retrieving related records via our API (show page) and persisting them to React state.

// patients_controller.rb:
// patch '/patients/:id' do
//     @patient = Patient.find_by_id(params[:id])
//     if @patient.update(first_name:params[:first_name], last_name:params[:last_name], birthday:params[:birthday], allergies:params[:allergies], email:params[:email], phone_number:params[:phone_number], address:params[:address])
//         @patient.to_json
//     else
//         { errors: @patient.errors.full_messages.to_sentences }.to_json
//     end
// end

// line 34: computed property used to specify a dynamic value. [key]: e.target.value

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

// fetch(`http://localhost:9292/patients/${id}`)
//   .then((r) => r.json())
//   .then((data) => {
//     setPatient(data);
//     setFormData(data);
//     setLoading(false);
//   });

// --------------------------- (new version that doesn't work)
// import React, { useState, useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";

// const initialEditState = {
//     firstName: "",
//     lastName: "",
//     allergies: "",
//     address: "",
//     email: "",
//     phoneNumber: ""
// }
// const EditPatient = ({ patients, onUpdatePatient }) => {
//   const [patient, setPatient] = useState(initialEditState);
//   const { id } = useParams();
//   const history = useHistory();

//   useEffect(() => {
//     if (patients.length > 0) {
//       const currentPatient = patients.find((p) => p.id === id)
//       setPatient(currentPatient)
//     }
//   }, [id, patients]);

//   // useEffect(() => {
//   //   fetch(`http://localhost:9292/patients/${id}`)
//   //     .then((r) => r.json())
//   //     .then((data) => {
//   //       setPatient(data);
//   //       setFormData(data);
//   //       setLoading(false);
//   //     });
//   // }, [id]);

//   const updatePatient = (e) => {
//     e.preventDefault();

//     const updatePatient = {
//       ...patient,
//       [e.target.name]: e.target.value
//     };

//     fetch(`http://localhost:9292/patients/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatePatient),
//     })
//       .then((r) => r.json())
//       .then((data) => console.log(data))

//     history.push(`/patients/${id}`)
//   };

//   const handleChange = (e) => {
//     const key = e.target.name;
//     setPatient({
//       ...patient,
//       [key]: e.target.value,
//     });
//   };

//   const handleCancelClick = (e) => {
//     e.preventDefault();
//     history.push(`/patients/${id}`);
//   };

//   if (!patient) return <h4>No patient data...</h4>

//   return (
//     <div>
//       <h2>Edit Patient</h2>
//       <form onSubmit={updatePatient}>
//         <div>
//           <label htmlFor="firstName">First Name: </label>
//           <input
//             type="text"
//             name="firstName"
//             id="firstName"
//             value={patient.firstName}
//             onChange={handleChange}
//           />{" "}
//           <label htmlFor="lastName">Last Name: </label>
//           <input
//             type="text"
//             name="lastName"
//             id="lastName"
//             value={patient.lastName}
//             onChange={handleChange}
//           />
//           <br />
//           <label htmlFor="allergies">Allergies: </label>
//           <input
//             type="text"
//             name="allergies"
//             id="allergies"
//             value={patient.allergies}
//             onChange={handleChange}
//           />
//           <br />
//           <label htmlFor="email">Email: </label>
//           <input
//             type="text"
//             name="email"
//             id="email"
//             value={patient.email}
//             onChange={handleChange}
//           />
//           <br />
//           <label htmlFor="phoneNumber">Phone Number: </label>
//           <input
//             type="text"
//             name="phoneNumber"
//             id="phoneNumber"
//             value={patient.phoneNumber}
//             onChange={handleChange}
//           />
//           <br />
//           <label htmlFor="address">Address: </label>
//           <input
//             type="text"
//             name="address"
//             id="address"
//             value={patient.address}
//             onChange={handleChange}
//           />
//         </div>
//         <br />
//         <input type="submit" value="Update" />
//         <button type="button" onClick={handleCancelClick}>
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditPatient;
