import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";

const MedicationDetails = ({ medications }) => {
  const [medication, setMedication] = useState({
    medication_name: "",
    thc_strength: "",
    cbd_strength: "",
    feelings: "",
    negatives: "",
    helps_with: "",
    details: "",
    aka: "",
    image_url: "",
    patients: []
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (medications.length > 0) {
      const currentMedication = medications.find((m) => m.id === parseInt(id));
      setMedication(currentMedication);
      setLoading(false);
    }
  }, [id, medications]);

  if (loading) return <h2>Loading...</h2>

  const handleClick = (e) => {
    e.preventDefault();
    history.go(-1);
  }

  return (
    <div>
      <br />
      <h2>{medication.medication_name}</h2>
      <img src={medication.image_url} alt="cannabis bud" />
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
      <hr />
      <button onClick={handleClick}>Back</button>
    </div>
  );
};

export default MedicationDetails