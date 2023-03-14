import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import LoginForm from "./components/LoginForm";
import PatientList from "./components/PatientList";
import PatientDetails from "./components/PatientDetails";
import NewPatient from "./components/NewPatient";
import MedicationList from "./components/MedicationList";
import NewMedication from "./components/NewMedication";
import MedicationDetails from "./components/MedicationDetails";
import EditPatient from "./components/EditPatient";

const App = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
  };

  const Login = (details) => {
    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      console.log("Logged in!");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else setError("Details do not match!");
  };

  const Logout = () => {
    console.log("Logged out!");
    setUser({ name: "", email: "" });
  };

  return (
    <div className="App">
      {user.email !== "" ? (
        <div>
          <h2>
            Welcome, <span>{user.name}</span>
          </h2>
          <button onClick={Logout}>Logout</button>
          <br />
          <Router>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/patients" component={PatientList} />
              <Route exact path="/patients/new" component={NewPatient} />
              <Route exact path="/patients/:id/edit" component={EditPatient} />
              <Route exact path="/patients/:id" component={PatientDetails} /> 
              <Route exact path="/medications" component={MedicationList} />
              <Route
                exact
                path="/patients/:patientId/medications/new"
                component={NewMedication}
              />
              <Route
                exact
                path="/medications/:id"
                component={MedicationDetails}
              />
              <Route component={ErrorPage} />
            </Switch>
          </Router>
        </div>
      ) : (
        <div>
          <h1>Daily Dose</h1>
          <h3>Patient & Medication Management for Pharmacists</h3>
          <br />
          <LoginForm Login={Login} error={error} />
        </div>
      )}
    </div>
  );
};

export default App;


// NOTES: -------------------------------------------
// App just handles the login and routing