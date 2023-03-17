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

const App = () => {
  const [patients, setPatients] = useState([]);
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

  if (loading) return <h2>Loading...</h2>;
  if (!patients) return null;

  const handleAddPatient = (newPatient) => {
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
  };

  const handleDeletePatient = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
  };

  const handleUpdatePatient = (updatedPatientObject) => {
    // eslint-disable-next-line array-callback-return
    const updatedPatients = patients.map((patient) => {
      if (patient.id === updatedPatientObject.id) {
        return updatedPatientObject;
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
          <Route exact path="/patients/:id/edit">
            <EditPatient onUpdatePatient={handleUpdatePatient} />
          </Route>
          <Route exact path="/patients/:id">
            <PatientDetails />
          </Route>
          <Route exact path="/medications">
            <MedicationList />
          </Route>
          <Route exact path="/patients/:patientId/medications/new">
            <NewMedication />
          </Route>
          <Route exact path="/medications/:id">
            <MedicationDetails />
          </Route>
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;


// NOTES: -------------------------------------------

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