import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { baseUrl } from '../globals';

const initialState = {
  firstName: "",
  lastName: "",
  birthday: "",
  gender: "",
  allergies: "",
  address: "",
  email: "",
  phoneNumber: "",
};

const EditPatient = () => {
    const [formData, setFormData] = useState(initialState)
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        const loadPatient = async () => {
            console.log(id)
            const resp = await fetch(`${baseUrl}/patients/${id}`)
            const data = await resp.json();
            console.log(data)
            setFormData(data);
            setLoading(false);
        }
        loadPatient();
    }, [id]);

    const handleChange = e => {
        const key = e.target.name 
        setFormData({
            ...formData,
            [key]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${baseUrl}/patients/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...formData })
        })
        history.push(`/patients/${id}`);
    }

    if (loading) { <h2>Loading...</h2> };

    return (
      <div>
        <h2>
          Edit Patient
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="first-name">First Name: </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              value={formData.firstName}
              onChange={handleChange}
              autoFocus={true}
            />
            <label htmlFor="last-name">Last Name: </label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              value={formData.lastName}
              onChange={handleChange}
              autoFocus={true}
            />
            <label htmlFor="birthday">Birthday: </label>
            <input
              type="text"
              name="birthday"
              id="birthday"
              value={formData.birthday}
              onChange={handleChange}
              autoFocus={true}
            />
            <label htmlFor="gender">Gender(birth): </label>
            <select name="gender">
              <option></option>
              <option value={formData.gender}>Male</option>
              <option value={formData.gender}>Female</option>
            </select>

            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              autoFocus={true}
            />

            <label htmlFor="phoneNumber">Phone Number: </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              autoFocus={true}
            />

            <label htmlFor="allergies">Allergies: </label>
            <input
              type="text"
              name="allergies"
              id="allergies"
              value={formData.allergies}
              onChange={handleChange}
              autoFocus={true}
            />

            <label htmlFor="address">Address: </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              autoFocus={true}
            />
          </div>
          <br />
          <input type="submit" value="Update" />
        </form>
      </div>
    );
}

export default EditPatient