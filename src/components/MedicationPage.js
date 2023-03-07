import React, { useState, useEffect } from 'react';
import SearchMedication from './SearchMedication';
import MedicationCard from './MedicationCard';
import { baseUrl } from '../globals';

const MedicationPage = () => {
    const [medications, setMedications] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/medications`)
            .then((r) => r.json())
            .then((data) => setMedications(data))
            .then(() => setLoading(false))
            .catch(setError);
    }, []);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <pre>{JSON.stringify(error)}</pre>; 
    if (!medications) return null;

    // const searchResults = medications.filter((medication) => 
    //     medication.medication_name.toLowerCase().includes(search.toLowerCase())
    // );
  
    const medicationCards = medications.map((medication) => (
      <MedicationCard key={medication.id} medication={medication} patient={medication.patient} />
    ));

    return (
      <div>
        <h2>Medications</h2>
        <SearchMedication search={search} onSearchChange={setSearch} />
        {medicationCards}
      </div>
    );
}


export default MedicationPage
