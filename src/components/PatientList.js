import React from "react";
import { NavLink } from "react-router-dom";
import PatientCard from "./PatientCard";
import SearchPatient from "./SearchPatient";

const PatientList = ({ patients, onPatientDelete, search, setSearch, onSearchChange }) => {

  const patientCards = patients.map((patient) => (
    <PatientCard
      key={patient.id}
      patient={patient}
      medication={patient.medications}
      onPatientDelete={onPatientDelete}
    />
  ));

  return (
      <div>
        <br />
        <h2>Patients</h2>
        <h4>
          <NavLink
            to={{
              pathname: "/patients/new",
            }}
          >
            + New
          </NavLink>
        </h4>
      <SearchPatient search={search} setSearch={setSearch} onSearchChange={onSearchChange} />
        <h4>{patientCards}</h4>
      </div>
  );
};

export default PatientList