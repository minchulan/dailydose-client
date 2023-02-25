import React from 'react';
import { NavLink } from 'react-router-dom';

const style = {
  width: "60%",
  margin: "5% 0 1%",
  padding: "0.5em",
  textDecoration: "none",
  color: "black",
  fontWeight: "bold",
  verticalAlign: "center"
};

const NavBar = () => {
  return (
    <nav>
      <NavLink
        activeStyle={{ fontWeight: "bolder" }}
        exact
        style={style}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        activeStyle={{ fontWeight: "bolder" }}
        exact
        style={style}
        to="/patients"
      >
        Patients
      </NavLink>
      <NavLink
        activeStyle={{ fontWeight: "bolder" }}
        exact
        style={style}
        to="/medications"
      >
        Medications
      </NavLink>
    </nav>
  );
}
  
export default NavBar