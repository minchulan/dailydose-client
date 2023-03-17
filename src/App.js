import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import PatientList from "./components/PatientList";
import PatientDetails from "./components/PatientDetails";
import NewPatient from "./components/NewPatient";
import MedicationList from "./components/MedicationList";
import NewMedication from "./components/NewMedication";
import MedicationDetails from "./components/MedicationDetails";
import EditPatient from "./components/EditPatient";
import Breadcrumbs from "./components/Breadcrumbs";

const App = () => {
  const [patients, setPatients] = useState([]);
  const [medications, setMedications] = useState([])
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:9292/patients`)
      .then((r) => r.json())
      .then((data) => {
        setPatients(data);
        setLoading(false);
      });
  }, []);

    useEffect(() => {
      fetch(`http://localhost:9292/medications`)
        .then((r) => r.json())
        .then((data) => {
          setMedications(data);
          setLoading(false);
        });
    }, []);


  if (loading) return <h2>Loading...</h2>;
  if (!patients) return null;

  const handleAddPatient = (newPatient) => {
    const updatedPatients = [...patients, newPatient]
    setPatients(updatedPatients).sort((a, b) =>
      a.first_name.localeCompare(b.first_name)
    );
  };

  const handleDeletePatient = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
  };

  const handleUpdatePatient = (updatedPatientObject) => {
    const updatedPatients = patients.map((patient) => {
      if (patient.id === updatedPatientObject.id) {
        return updatedPatientObject;
      } else {
        return patient
      }
    });
    setPatients(updatedPatients);
  };

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch)
  };

  const displayedPatients = patients.filter((patient) =>
    patient.first_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/patients">
            <PatientList
              patients={displayedPatients}
              search={search}
              onPatientDelete={handleDeletePatient}
              onSearchChange={handleSearchChange}
            />
          </Route>
          <Route exact path="/patients/new">
            <NewPatient onAddPatient={handleAddPatient} />
          </Route>
          <Route path="/patients/:id/edit">
            <EditPatient onUpdatePatient={handleUpdatePatient} />
          </Route>
          <Route exact path="/patients/:id">
            <PatientDetails patients={patients} />
          </Route>
          <Route exact path="/medications">
            <MedicationList medications={medications} setMedications={setMedications} />
          </Route>
          <Route path="/patients/:patientId/medications/new">
            <NewMedication />
          </Route>
          <Route path="/medications/:id">
            <MedicationDetails medications={medications} />
          </Route>
          <Route component={ErrorPage} />
          <Breadcrumbs />
        </Switch>
      </Router>
    </div>
  );
}
export default App;


// NOTES: -------------------------------------------

// Get only the primary records within the list view (/patients) and only retrieve related records when hitting the show (detail) endpoint (/patients/:id)
  // - Only fetch patients from the /patients endpoint and then retrieve the medications with the patient when we hit /patients/:id,
  // - I went with this option to think about performance issues as we scale. Although fetching all the information to /patients would allow me not to have a separate endpoint for /patients/:id, at scale this will become problematic if users can accumulate 10s of thousands of data points. Since we'll have to shift away from this approach eventually, I went with option 2 :)

  // Option 2 -- 
    // PROS:
      // - If we only fetch the patients from /patients and then only retrieve the medications when hitting the /patients/:id, then our endpoint will respond more quickly.
      // - our state won't include information that our users haven't yet decided that they wanted to see.
    // CONS:
      // - we'll need to trigger an additional fetch call when we visit the /patients/:id client side route.
      // - stateful logic may be more complicated:
         // - we could give the detail component state and store the related data there, but then we'd need to refetch every time we return to a different patient show route.
         // - we could keep all patients in state within the PatientsContainer and then store the related medications as a property within the patient. It will require extra conditional logic both to update the state of the parent upon receiving the results of a fetch from PatientDetail. We can also add additional logic to check if the medications are already there within state before we trigger a fetch to the api to avoid refetching.
      // - Although the initial load for the list will be faster with this approach, additional fetches will be required as you move from page to page, so fetching everything up front can make the app feel more responsive after the initial load.



// patients_controller.rb:
    // get '/patients' do
    //     @patients = Patient.all.order(:first_name)
    //     @patients.to_json
    // end 

/* 
For each feature, think about:
- Do we need state?
    - Where should that state live? 
- What props do I need?
- How can I pass data to the components that need it?
*/


/* 
edit patient functionality:
- Do we need state?
    - Where should that state live? 
- What props do I need?
- How can I pass data to the components that need it?
*/

/* patient search functionality:
- Do we need state? Yes, input field search bar. we need to capture values in input field.
    - Where should that state live? what components need access to this state?
      * showing info in the input field.
      * showing what patients will be displayed down below.
        1. the search bar is rendered on PatientList. 
        2. PatientList is rendered on App. 
        3. Lift state up to common ancestor -- App. 
- What props do I need?
- How can I pass data to the components that need it?
*/

// line 65 shorthand for this:
  // const handleSearchChange = (newSearch) => {
  //   setSearch(newSearch)
  // };



// HELPER FUNCTIONS:
  // const handleAddPatient = (newPatient) => {
  //   const updatedPatients = [...patients, newPatient];
  //   setPatients(updatedPatients);
  // };

  // const handleDeletePatient = (id) => {
  //   const updatedPatients = patients.filter((patient) => patient.id !== id);
  //   setPatients(updatedPatients);
  // };

  // const handleSearchPatient = (term) => {
  //   const filteredPatientResults = patients.filter((patient) =>
  //     patient.first_name.toLowerCase().includes(term.toLowerCase())
  //   );
  //   setPatients(filteredPatientResults);
  // };

  // const handleEditPatient = (updatedPatientObject) => {
  //   const updatedPatients = patients.map((patient) => {
  //     if (patient.id === updatedPatientObject.id) {
  //       return updatedPatientObject;
  //     }
  //   });
  //   setPatients(updatedPatients);
  // };


// App handles the login and routing / Also, renders a piece of state [patients]