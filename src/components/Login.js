import React, { useState } from 'react';

const Login = (props) => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true)
    setEmail('');
    setPassword('');
  }

  return (
    <div className="auth-form-container">  
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="***********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
}

export default Login