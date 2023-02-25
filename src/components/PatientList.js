import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SearchPatient from './SearchPatient';
import PatientCard from './PatientCard';

const PatientList = ({searchPatient, setSearchPatient, onSearchChange}) => {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/patients')
      .then(r => r.json())
      .then(data => console.log(data))
  }, [])

  const displayedPatients = patients.filter(patient => patient.patient_name.toLowerCase().includes(searchPatient.toLowerCase()))
  // console.log(displayedPatients)

  // since 2 functions expect the same parameter, we can just set setSearchPatient as the value to the onSearchChange prop in line 23:
  // const handleSearchChange = (newSearch) => {
  //   // console.log(newSearch)
  //   setSearchPatient(newSearch) 
  // }

  return (
    <>
      <br />
      <br />
      <h4>{<NavLink to="/patients/new">+ Create</NavLink>}</h4>
      <SearchPatient searchPatient={searchPatient} setSearchPatient={setSearchPatient} onSearchChange={onSearchChange} />
      {displayedPatients}
      <ul>
        {patients.map(patient => (
          <PatientCard key={patient.id} name={patient.patient_name} birthday={patient.date_of_birth} address={patient.address} gender={patient.gender} phone={patient.phone_number} allergies={patient.allergies} />
        ))}
      </ul>
    </>
  );
}

export default PatientList