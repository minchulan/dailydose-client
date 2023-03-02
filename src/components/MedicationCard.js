import React, { useState } from 'react';
import MedicationEditForm from './MedicationEditForm';

const MedicationCard = ({ medication, onDeleteMedication, onUpdateMedication }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { price, id } = medication;

    const handleDeleteClick = () => {
        fetch(`http://localhost:9292/medications/${id}`, {
            method: "DELETE"
        })
        onDeleteMedication(id)
    };

    const handlePictureClick = () => {
        window.alert("You will be redirected to the lowest Rx prices")
        window.location.href = "https://www.goodrx.com";
    };

    const handleUpdatePrice = (updatedPrice) => {
        setIsEditing(false);
        onUpdateMedication(updatedPrice);
    }

    return (
      <div>
        <img src={medication.image_url} alt="medication images" onClick={handlePictureClick}/>
        <h3>{medication.medication_name}</h3>
        <h5>{medication.dose} mg, {medication.quantity} tablets</h5>
        <hr />
        {isEditing ? (<MedicationEditForm price={price} id={id} onUpdateMedication={handleUpdatePrice} />) : (<h2>${medication.price}</h2>)}
        <button className="emoji-button edit" onClick={() => setIsEditing(isEditing => !isEditing)}>✏️</button>
        <button className="emoji-button delete" onClick={handleDeleteClick}>🗑</button>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
}

export default MedicationCard