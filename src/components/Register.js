import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register = (props) => {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      history.push("/home");
  }
    
    return (
      <div className="auth-form-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>
          <input
            value={name}
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <label htmlFor="email">Email</label>
          <input
            value={email}
            type="text"
            id="name"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <label htmlFor="password">password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*********"
            id="password"
            name="password"
          />
          <button type="submit">Register</button>
        </form>
        <button
          className="link-btn"
          onClick={() => props.onFormSwitch("login")}
        >
          Already have an account? Login here.
        </button>
      </div>
    );
}

export default Register