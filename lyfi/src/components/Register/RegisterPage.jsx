import React from "react";
import "../login/login.css";

const RegisterPage = ({ name, password, setPassword, setName, handleSubmit, email, setEmail }) => {
  return (
    <div className="login">
      <div className="login-header">
        <h1>Livy Login</h1>
      </div>
      <div className="group">
        <div className="input-container">
          <input
            placeholder="Username"
            className="input-field"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="input-field" className="input-label">
            Username
          </label>
          <span className="input-highlight"></span>
        </div>

        <div className="input-container">
          <input
            placeholder="Username"
            className="input-field"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="input-field" className="input-label">
            Email
          </label>
          <span className="input-highlight"></span>
        </div>

        <div className="input-container">
          <input
            placeholder="Password"
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="input-field" className="input-label">
            Password
          </label>
          <span className="input-highlight"></span>
        </div>
      </div>
      <div className="login-footer pt-5">
        <button onClick={handleSubmit} >Kirim</button>
      </div>
    </div>
  );
};

export default RegisterPage;
