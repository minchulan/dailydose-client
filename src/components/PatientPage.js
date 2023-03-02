import React, { useState, useEffect } from 'react';
import PatientList from './PatientList';
import SearchPatient from './SearchPatient';
import { NavLink } from 'react-router-dom';

const PatientPage = () => {
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:9292/patients`)
        .then((r) => r.json())
        .then((data) => setPatients(data))
        .then(() => setLoading(false))
        .catch(setError);
    }, []);
    if (loading) return <h1>Loading...</h1>;
    if (error) return <pre>{JSON.stringify(error)}</pre>;
    if (!patients) return null;

    const searchResults = patients.filter((patient) =>
        patient.medication_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    return (
      <div>
        <h2>Patients</h2>
        <h4>{<NavLink to="/patients/new">+ New </NavLink>}</h4>
        
      </div>
    );
}

export default PatientPage