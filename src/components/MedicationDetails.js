/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../globals';

const MedicationDetails = () => {
    const [medication, setMedication] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const loadMedication = () => {
            fetch(`${baseUrl}/medications/${id}`)
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
            <h2>{medication.medication_name}</h2>
            <img src={medication.image_url} alt="cannabis bud image" />
            <h5>(aka {medication.aka})</h5>
            <h4>
              THC {medication.thc_strength}%, CBD {medication.cbd_strength}%{" "}
            </h4>

            <p>{medication.details}</p>
            <hr />
            <span>
              <b>STRAIN HIGHLIGHTS</b>
            </span>
            <p>
              <b>
                <em>👍 Feelings:</em>
              </b>{" "}
              {medication.feelings}
            </p>
            <p>
              <b>
                <em>👎 Negatives:</em>
              </b>{" "}
              {medication.negatives}
            </p>
            <p>
              <b>
                <em>➕ Helps with:</em>
              </b>{" "}
              {medication.helps_with}
            </p>
            <hr />
            <p>
              <b>
                <em>⚕️ Patient(s):</em>
              </b>
              <br />
              <br />
              <NavLink to={`/patients/${medication.patient.id}`}>
                {medication.patient.first_name} {medication.patient.last_name}
              </NavLink>
              <br />
            </p>
          </div>
        );
    }
}

export default MedicationDetails