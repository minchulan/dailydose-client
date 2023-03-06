import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import PatientPage from "./components/PatientPage";
import NewPatient from "./components/NewPatient";
import MedicationPage from "./components/MedicationPage";
import NewMedication from "./components/NewMedication";
import ErrorPage from "./components/ErrorPage";
import LoginForm from "./components/LoginForm";
import Patient from "./components/Patient";

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

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
              <Route exact path="/patients" component={PatientPage} />
              <Route path="/patients/:id" component={Patient} />
              <Route exact path="/patients/new" component={NewPatient} />
              <Route exact path="/medications" component={MedicationPage} />
              <Route exact path="/medications/new" component={NewMedication} />
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
}

export default App;
