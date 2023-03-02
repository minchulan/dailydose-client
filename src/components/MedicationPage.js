import React, { useState, useEffect } from 'react';
import MedicationList from './MedicationList';
import SearchMedication from './SearchMedication';
import { NavLink } from 'react-router-dom';

const MedicationPage = () => {
    const [medications, setMedications] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:9292/medications`)
            .then((r) => r.json())
            .then((data) => setMedications(data))
            .then(() => setLoading(false))
            .catch(setError);
    }, []);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <pre>{JSON.stringify(error)}</pre>; 
    if (!medications) return null;

    const searchResults = medications.filter((medication) => 
        medication.medication_name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDeleteMedication = (medication) => {
        setMedications([...medications, medication]);
    };

    const handleAddMedication = (medication) => {
        setMedications([...medications, medication]);
    }

    const handleUpdateMedication = () => {
        console.log("updated!");
    }
    
    return (
        <div>
            <h2>Medications</h2>
            <h4>{<NavLink to="/medications/new">+ New </NavLink>}</h4>
            <SearchMedication search={search} onSearchChange={setSearch} />
            {medications && <MedicationList medications={searchResults} onDeleteMedication={handleDeleteMedication} onAddNewMedication={handleAddMedication} />}
        </div>    
    );
}


export default MedicationPage
