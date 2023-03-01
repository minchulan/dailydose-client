import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from "./components/Home";
import PatientList from './components/PatientList';
import NewPatient from './components/NewPatient';
import MedicationList from './components/MedicationList';
import NewMedication from './components/NewMedication';
import ErrorPage from "./components/ErrorPage";
import Login from './components/Login';
import MedicationCard from './components/MedicationCard';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
// import Register from './components/Register';

function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/about" component={About} />
          <Route exact path="/how-it-works" component={HowItWorks} />
          <Route exact path="/patients" component={PatientList} />
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