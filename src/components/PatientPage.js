import React, { useState, useEffect } from "react";
import SearchPatient from "./SearchPatient";
import { NavLink } from "react-router-dom";
import {baseUrl} from '../globals'
import PatientCard from "./PatientCard";

const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/patients`)
      .then((r) => r.json()) //promise object returns 3 statuses: resolved, pending, error
      .then((data) => setPatients(data))
      .then(() => setLoading(false))
      .catch(setError);
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!patients) return null;

  const deletePatient = (id) => {
    fetch(`${baseUrl}/patients/${id}`, {
      method: "DELETE"
    })
    removePatient(id);
  };

  const removePatient = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id))
  };

  const patientsList = patients.map((patient) => (
    <PatientCard key={patient.id} patient={patient} medication={patient.medication} deletePatient={deletePatient} />
  ));

  return (
    <div>
      <br />
      <h2>Patients</h2>
      <h4>{<NavLink to="/patients/new">+ Create </NavLink>}</h4>
      <SearchPatient search={search} onSearchChange={setSearch} />
      <h4>{patientsList}</h4>
    </div>
  );
};

export default PatientPage;
