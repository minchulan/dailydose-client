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
    history.push('/patients');
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

export default PatientDetails