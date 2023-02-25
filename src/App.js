import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from "./components/Home";
import PatientList from './components/PatientList';
import NewPatient from './components/NewPatient';
import MedicationList from './components/MedicationList';
import NewMedication from './components/NewMedication';
import ErrorPage from "./components/ErrorPage";

function App() {

  return (
    <main className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/patients" component={PatientList} />
          <Route exact path="/patients/new" component={NewPatient} />
          <Route exact path="/medications" component={MedicationList} />
          <Route exact path="/medications/new" component={NewMedication} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </main>
  );

}

export default App;
