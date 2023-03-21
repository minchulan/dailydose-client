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
  
  // useEffect(() => {
  //   const loadMedication = () => {
  //     fetch(`http://localhost:9292/medications/${id}`)
  //       .then((r) => r.json())
  //       .then((data) => setMedication(data));
  //   };
  //   loadMedication();
  // }, [id]);

  if (loading) return <h2>Loading...</h2>

  const handleClick = (e) => {
    e.preventDefault();
    history.push('/medications')
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

export default MedicationDetails;

// NOTES: ------------------------------------------
// upon mount (useEffect), go through all the medications and load this one. medications in deps array. medication will come through as an empty array. 


// here from medication details page , we have the ability to retrieve the patients on that particular medication.
// retrieving related records via our API and persisting them to React state.
// get '/medications/:id' do
//     @medication = Medication.find_by_id(params[:id])
//     @medication.to_json(include: [:patient])
// end

// ---------------------- (new version that doesnt work)
// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { useParams } from "react-router-dom";

// const MedicationDetails = ({ medications }) => {
//   console.log({medications})
//   const [medication, setMedication] = useState({
//     medicationName: "",
//     thcStrength: "",
//     cbdStrength: "",
//     feelings: "",
//     negatives: "",
//     helpsWith: "",
//     details: "",
//     aka: "",
//     imageUrl: "",
//   });

//   const { id } = useParams();

//   useEffect(() => {
//     if (medications.length > 0) {
//       const currentMedication = medications.find((m) => m.id === id)
//       setMedication(currentMedication)
//     }
//   }, [id, medications, medications.id])

// // const MedicationDetails = () => {
// //   const [medication, setMedication] = useState(null);
// //   const { id } = useParams();

// //   useEffect(() => {
// //     const loadMedication = () => {
// //       fetch(`http://localhost:9292/medications/${id}`)
// //         .then((r) => r.json())
// //         .then((data) => setMedication(data));
// //     };
// //     loadMedication();
// //   }, [id]);

//   if (!medication) {
//     return <h2>Loading...</h2>;
//   } else {
//     return (
//       <div>
//         <br />
//         <h2>{medication.medicationName}</h2>
//         <img src={medication.imageUrl} alt="cannabis bud" />
//         <h5>(aka {medication.aka})</h5>
//         <h4>
//           THC {medication.thcStrength}%, CBD {medication.cbdStrength}%{" "}
//         </h4>

//         <p>{medication.details}</p>
//         <hr />
//         <span>
//           <b>STRAIN HIGHLIGHTS</b>
//         </span>
//         <p>
//           <b>
//             <em>👍 Feelings:</em>
//           </b>{" "}
//           {medication.feelings}
//         </p>
//         <p>
//           <b>
//             <em>👎 Negatives:</em>
//           </b>{" "}
//           {medication.negatives}
//         </p>
//         <p>
//           <b>
//             <em>➕ Helps with:</em>
//           </b>{" "}
//           {medication.helpsWith}
//         </p>
//         <hr />
//         <p>
//           <b>
//             <em>⚕️ Patient(s):</em>
//           </b>
//           <br />
//           <br />
//           <NavLink to={`/patients/${medication.patient.id}`}>
//             {medication.patient.first_name} {medication.patient.last_name}
//           </NavLink>
//           <br />
//         </p>
//       </div>
//     );
//   }
// };

// export default MedicationDetails;
