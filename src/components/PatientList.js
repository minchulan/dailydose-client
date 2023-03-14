import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { baseUrl } from "../globals";
import PatientCard from "./PatientCard";
import SearchPatient from "./SearchPatient";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${baseUrl}/patients`)
      .then((r) => r.json())
      .then((data) => {
        setPatients(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (!patients) return null;

  const handleDeletePatient = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
  };

  const handleSearchPatient = (term) => {
    const filteredPatientResults = patients.filter((patient) =>
      patient.first_name.toLowerCase().includes(term.toLowerCase())
    );
    setPatients(filteredPatientResults);
  };

  const patientCards = patients.map((patient) => (
    <PatientCard
      key={patient.id}
      patient={patient}
      medication={patient.medications}
      onPatientDelete={handleDeletePatient}
    />
  ));

  return (
    <div>
      <br />
      <h2>Patients</h2>
      <h4>{<NavLink to="/patients/new">+ Create </NavLink>}</h4>
      <SearchPatient handleSearchPatient={handleSearchPatient} />
      <h4>{patientCards}</h4>
    </div>
  );
};

export default PatientList;



// NOTES -------------------------------------------------------------------
// child of app
// gets the array of patients
// renders each individual patient card


// when patientList component first loads, make a fetch request to update state variable of patients to include all the patients from my Sinatra API
// fetch patients as part of our app components lifecycle, need to use the useEffect hook. Call the useEffect hook and pass in callback function, and empty deps array as second argument. When our patientList component loads as a side effect, will run this call back function and trigger this fetch request. Use the array of patients to set that piece of state.


//line 48 replacement: does not work 
      // {
        /* <h4> */
      // }
      // {
        /* <NavLink
          to={{
            pathname: "/patients/new",
            state: { onAddPatient: handleAddPatient },
          }}
        >
          + Create
        </NavLink>
      </h4> */
      // }


  // can't figure out how to pass up a callback function onAddPatient to NavLink in parent component
  // history.push works tho....
  // const handleAddPatient = (newPatient) => {
  //   const updatedPatients = [...patients, newPatient];
  //   setPatients(updatedPatients);
  // };



  // can't figure out how to pass up a callback function onEditPatient to NavLink in parent component
  // history.push does NOT work...
  // const handleEditPatient = (updatedPatientObject) => {
  //   const updatedPatients = patients.map(patient => {
  //     if (patient.id === updatedPatientObject.id) {
  //       return updatedPatientObject
  //     }
  //   })
  //   setPatients(updatedPatients)
  // };


/*
// when the delete button is clicked, make a DELETE request to /patients/:id. Also, remove the patient from the PatientList.

Question: Is it better to keep all of our fetches/state in a container and pass down state and callbacks as props -OR- to add state and fetch calls throughout the component hierarchy where necessary? 


Option 1: Get all related records that we want to display with every request to the API (all medications included with patients)
  -Pros: if we have all medications with the patients, the then state shape is consistent for all patients (whether we have visited the show route or not) 
    - if we get all of the info from the fetch to /patients then we don't need to have a separate endpoint for /patients/:id if we don't want to have it.
  -Cons: If we fetch all of the related info when we hit the /patients endpoint, we'll end up fetching a bunch of info that our users may not want to see on their current visit. 
    - Because we're fetching additional info at the /patients endpoint, the endpoint will also take a bit longer to respond than if we didn't include the related info. 
    - At scale this will become problematic if users can accumulate 10s of thousands of data points, so we'd probably want to shift away from an approach like this eventually. 


Option 2: Get only the primary records within the list view ( / patients ) [PatientList component] and only retrieve related records when hitting the show (detail) endpoint ( /patients/:id) [PatientDetails component]
  -Pros: if we only fetch the patients from /patients and then only retrieve the medications when hitting the /patients/:id
    -then our endpoint will respond more quickly.
    -our state won't include info that our users haven't yet decided that they wanted to see. 
  -Cons: if we only fetch patients from the /patients endpoint and then retrieve the medications with the patient when we hit /patients/:id, then
    - we'll need to trigger an additional fetch call when we visit the /patients/:id client side route
    - the stateful logic may be more complicated:
        -we could give the detail component state and store the related data there, but then we'd need to refetch every time we return to a different patient show route. 
        - we could keep all patients in state within the PatientsContainer and then store the related medications as a property within the patient. It wil require extra conditional logic both to update the state of the parent upon receiving the results of a fetch from PatientDetail. We can also add additional logic to check if the medications are already there within state before we trigger a fetch to the api to avoid refetching. 
    - Although the initial load for the list will be faster with this approach, additional fetches will be required as you move from page to page, so fetching everything up front can make the app feel more responsive after the initial load. 


Conclusion: Option 1 simplifies our react state logic. If our app grows a lot, and we start having performance issues, we can think about reworking our approach, but for the start it will work fine to always return the related objects as a property (medications within each patient) and it'll be much easier to work with on the react end at this point. 
*/
