import React from 'react';

const MedicationCard = ({ medication }) => {

    return (
      <div>
        <img src={medication.image_url} alt="medication images" />
        <h3>{medication.medication_name}</h3>
        <p>aka {medication.aka}</p>
        <h5>THC {medication.thc_strength}%, CBD {medication.cbd_strength}%</h5>
        <p>🧘 {medication.feelings}</p>
        <hr />
      </div>
    );
}

export default MedicationCard