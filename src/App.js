import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Home from "./components/Home";
import PatientList from './components/PatientList';
import NewPatient from './components/NewPatient';
import MedicationList from './components/MedicationList';
import NewMedication from './components/NewMedication';
import ErrorPage from "./components/ErrorPage";

function App() {
  const [searchPatient, setSearchPatient] = useState("");
  // const handleSearchChange = (newSearch) => {
  //   setSearchPatient(newSearch)
  // }
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Header slogan="my medicine cabinet" storeName="The pharmacist's personal EHR"/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/patients" component={PatientList} searchPatient={searchPatient} setSearchPatient={setSearchPatient} onSearchChange={setSearchPatient} />
          <Route exact path="/patients/new" component={NewPatient} />
          <Route exact path="/medications" component={MedicationList} />
          <Route exact path="/medications/new" component={NewMedication} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
      </div>
  );
}

export default App;
