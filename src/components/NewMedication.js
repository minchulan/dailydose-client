import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const NewMedication = ({ onAddNewMedication }) => {
  const [medicationName, setMedicationName] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    setMedicationName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const medicationObject = { medication_name: medicationName };

    fetch("http://localhost:9292/medications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicationObject),
    })
      .then((r) => r.json())
      .then((data) => onAddNewMedication(data));

    history.push("/medications");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="new-drug-form">
        <label htmlFor="rx-name">Name: </label>
        <input
          type="text"
          id="rx-name"
          name="rx-name"
          value={medicationName}
          onChange={handleChange}
          autoFocus={true}
          className="input-text"
        />
        <br />
        <label htmlFor="rx-image">Image URL: </label>
        <input type="url" id="rx-image" name="rx-image" />
        <br />
        <label htmlFor="rx-dose">Dose: </label>
        <input type="number" id="rx-dose" name="rx-dose" />
        <br />
        <label htmlFor="rx-quantity">Quantity: </label>
        <input type="number" id="rx-quantity" name="rx-quantity" />
        <br />
        <label htmlFor="rx-price">Price: </label>
        <input type="number" id="rx-price" name="rx-price" />
        <br />
        <label htmlFor="rx-coupon">Coupon URL: </label>
        <input type="url" id="rx-coupon" name="rx-coupon" />
        <br />
        <input type="submit" value="Add Medication Savings" />
      </div>
    </form>
  );
};

export default NewMedication;
