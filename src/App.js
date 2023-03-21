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
  if (!medications) return null;

  const handleAddPatient = (newPatient) => {
    const updatedPatients = [...patients, newPatient]
    setPatients(updatedPatients)
  };

  const handleAddMed = (newMedication) => {
    const updatedMedications = [ newMedication, ...medications]
    setMedications(updatedMedications)
  }

  const handleDeleteMedication = (id) => {
    const updatedMedications = medications.filter((medication) => medication.id !== id)
    setMedications(updatedMedications);
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
        return patient;
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
              setSearch={setSearch}
              onPatientDelete={handleDeletePatient}
              onSearchChange={handleSearchChange}
            />
          </Route>
          <Route exact path="/patients/new">
            <NewPatient onAddPatient={handleAddPatient} />
          </Route>
          <Route path="/patients/:id/edit">
            <EditPatient
              patients={patients}
              onUpdatePatient={handleUpdatePatient}
            />
          </Route>
          <Route exact path="/patients/:id">
            <PatientDetails
              patients={patients}
              medications={medications}
              onDeleteMedication={handleDeleteMedication}
            />
          </Route>
          <Route exact path="/medications">
            <MedicationList
              medications={medications}
              setMedications={setMedications}
            />
          </Route>
          <Route path="/patients/:patientId/medications/new">
            <NewMedication
              patients={patients}
              onAddMed={handleAddMed}
            />
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
export default App