import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MedicationDetails = () => {
    const [medication, setMedication] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const loadMedication = () => {
            fetch(`http://localhost:9292/medications/${id}`)
                .then(r => r.json())
                .then(data => setMedication(data))
        }
        loadMedication();
    }, [id])

    if (!medication) {
        return <h2>Loading...</h2>
    } else {
      
        return (
            <div>
                <br />
            <h3>{medication.medication_name}</h3>
            <h5>(aka {medication.aka})</h5>
            <h5>
              THC {medication.thc_strength}%, CBD {medication.cbd_strength}%{" "}
            </h5>

            {medication.image_url}

            <p>{medication.details}</p>

            <p>
              <em>Helps with:</em>
            </p>
            {medication.helps_with}
            <p>
              <em>Top reported effects:</em>
            </p>
            {medication.feelings}
            <p>Negatives:</p>
            <p>{medication.negatives}</p>
          </div>
        );
    }
}

export default MedicationDetails