import React, { useState } from 'react';
import PatientList from '../components/PatientList';

const PatientContext = React.createContext();

const PatientProvider = ({ children }) => {
    const [patient, setPatient] = useState(PatientList);
    return (
        <PatientContext.Provider value={{patient, setPatient}}>
            {children}
        </PatientContext.Provider>
    )
}

export { MyContext, PatientProvider }



// NOTES:------------------
// Provider is baked in
// Create a context first 
// value prop is fundamental
// destructure children and display children within 
// 