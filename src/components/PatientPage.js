import React, { useState, useEffect } from 'react';
import SearchPatient from './SearchPatient';
import { NavLink } from 'react-router-dom';
import PatientLink from './PatientLink';

const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  const [patientFormFlag, setPatientFormFlag] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:9292/patients`)
      .then((r) => r.json()) //promise object returns 3 statuses: resolved, pending, error
      .then((data) => setPatients(data))
      .then(() => setLoading(false))
      .catch(setError);
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!patients) return null;

  const patientsList = patients.map((patient) => <PatientLink key={patient.id} patient={patient} />)


    return (
      <div>
        <h2>Patients</h2>
        <h4>{<NavLink to="/patients/new">+ New </NavLink>}</h4>
        <SearchPatient search={search} onSearchChange={setSearch} />
        {patientsList}
      </div>
    );
}

export default PatientPage