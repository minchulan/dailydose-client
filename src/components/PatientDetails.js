import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import MedicationCard from "./MedicationCard";
import { NavLink } from "react-router-dom";

  const PatientDetails = ({ patients, onDeleteMedication }) => {
    const [patient, setPatient] = useState({
      first_name: "",
      last_name: "",
      birthday: "",
      gender: "",
      allergies: "",
      address: "",
      email: "",
      phone_number: "",
      medications: []
    });
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
      if (patients.length > 0) {
        const currentPatient = patients.find((p) => p.id === parseInt(id));
        setPatient(currentPatient);
        setLoading(false);
      }
    }, [id, patients]);

    if (loading) return <h2>Loading....</h2>;

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/patients`)
  }

  const deleteMedication = (id) => {
    fetch(`http://localhost:9292/medications/${id}`, {
      method: "DELETE",
    });
    removeMedication(id);
    onDeleteMedication(id);
  };

  const removeMedication = (id) => {
    setPatient({
      ...patient,
      medications: patient.medications.filter(
        (medication) => medication.id !== id
      ),
    });
  };

  const medicationCards = patient.medications.map((medication) => (
    <MedicationCard
      key={medication.id}
      medication={medication}
      patient={patient}
      onMedicationDelete={deleteMedication}
    />
  ));

  return (
    <div className="actions">
      <br />
      <p>
        <NavLink to={`/patients/${id}/edit`}>✏️ Edit Patient</NavLink>⎮
        <NavLink to={`/patients/${id}/medications/new`}>
          ✚ New Medication
        </NavLink>
      </p>
      <h2>
        {patient.first_name} {patient.last_name}
      </h2>
      <h4>
        Birthday: {patient.birthday} <br />
      </h4>
      <h5>Gender: {patient.gender}</h5>
      <h5>Address: {patient.address}</h5>
      <h5> Allergies: {patient.allergies}</h5>
      <h5>
        📧 {patient.email} ⎮ ✆ {patient.phone_number}
      </h5>
      <hr />
      <h4>Current Medications:</h4>
      <h5>{ medicationCards }</h5>
      <hr />
      <button onClick={handleClick}>Back</button>
    </div>
  );
};

export default PatientDetails;

// NOTES: ----------------------------------------------------

// from the patient details page, we have the ability to create medications for a patient from the patient detail page and to display them.

// retrieving related records via our API and persisting them to React state.
// get '/patients/:id' do
//     @patient = Patient.find_by_id(params[:id])
//     @patient.to_json(include: [:medications])
// end

// ability to do some dynamic routing. When component loads, we fetch info about that specific patient using id.
// use that display all patient info on its own page.
// line 38:   // we have a patient in state. now we want to map over the patient's medications. to access patient's medications use patient.medications.

// const PatientDetails = ({ patients }) => {
// const [patient, setPatient] = useState({
//   address: "",
//   allergies: "",
//   birthday: "",
//   email: "",
//   first_name: "",
//   last_name: "",
//   gender: "",
//   medications: []
// })

//   useEffect(() => {
//     if (patients.length > 0) {
//       const currentPatient = patients.find((p) => p.id === id);
//       setPatient(currentPatient);
//       setLoading(false);
//     }
//   }, [patients]);

//   if (loading) return <h2>Loading....</h2>;

// const handleDeletePatient = (id) => {
//   const updatedPatients = patients.filter((patient) => patient.id !== id);
//   setPatients(updatedPatients);
// };

// setPatient({
//   ...patient,
//   medications: patient.medications.filter(
//     (medication) => medication.id !== id
//   )
// });

// ----------------------- (new version that doesnt work)
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import MedicationCard from "./MedicationCard";
// import { NavLink } from "react-router-dom";

// // const PatientDetails = ({ patients }) => {
// //   console.log({ patients });
// //   const [patient, setPatient] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const { id } = useParams();

// //   useEffect(() => {
// //     fetch(`http://localhost:9292/patients/${id}`)
// //       .then((r) => r.json())
// //       .then((data) => {
// //         setPatient(data);
// //         setLoading(false);
// //       });
// //   }, [id]);

// //   if (loading) return <h2>Loading....</h2>;

//   const PatientDetails = ({ patients }) => {
//     const [patient, setPatient] = useState({
//       firstName: "",
//       lastName: "",
//       birthday: "",
//       gender: "",
//       allergies: "",
//       address: "",
//       email: "",
//       phoneNumber: "",
//       medications: [],
//     });
//     const [loading, setLoading] = useState(true);
//     const { id } = useParams();

//     useEffect(() => {
//       if (patients.length > 0) {
//         const currentPatient = patients.find((p) => p.id === id)
//         setPatient(currentPatient)
//         setLoading(false)
//       }
//     }, [id, patients])

//     if (!patient) return <h4>No patient data...</h4>
//     if (loading) return <h4>Loading...</h4>

//   const deleteMedication = (id) => {
//     fetch(`http://localhost:9292/medications/${id}`, {
//       method: "DELETE",
//     });
//     removeMedication(id);
//   };

//   const removeMedication = (id) => {
//     setPatient({
//       ...patient,
//       medications: patient.medications.filter(
//         (medication) => medication.id !== id
//       ),
//     });
//   };

//   const medicationCards = patient.medications.map((medication) => (
//     <MedicationCard
//       key={medication.id}
//       medication={medication}
//       patient={patient}
//       onMedicationDelete={deleteMedication}
//     />
//   ));

//   return (
//     <div className="actions">
//       <br />
//       <p>
//         <NavLink to={`/patients/${id}/edit`}>✏️ Edit Patient</NavLink>⎮
//         <NavLink to={`/patients/${id}/medications/new`}>
//           ✚ New Medication
//         </NavLink>
//       </p>
//       <h2>
//         {patient.first_name} {patient.last_name}
//       </h2>
//       <h4>
//         Birthday: {patient.birthday} <br />
//       </h4>
//       <h5>Gender: {patient.gender}</h5>
//       <h5>Address: {patient.address}</h5>
//       <h5> Allergies: {patient.allergies}</h5>
//       <h5>
//         📧 {patient.email} ⎮ ✆ {patient.phone_number}
//       </h5>
//       <hr />
//       <h4>Current Medications:</h4>
//       <h5>{medicationCards}</h5>
//     </div>
//   );
// };

// export default PatientDetails
