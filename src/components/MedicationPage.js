import React, { useState, useEffect } from 'react';
import MedicationList from './MedicationList';
import SearchMedication from './SearchMedication';
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

    const searchResults = medications.filter((medication) => 
        medication.medication_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div>
        <h2>Medications</h2>
        <SearchMedication search={search} onSearchChange={setSearch} />
        {medications && (
          <MedicationList
            medications={searchResults}
          />
        )}
      </div>
    );
}


export default MedicationPage
