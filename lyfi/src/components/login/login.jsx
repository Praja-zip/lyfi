import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, useLocation } from "react-router-dom";

const LoginPage = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  error,
}) => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true); // Show the error popup
    }
  }, [error]);

  const handleCloseError = () => {
    setShowError(false); // Hide the error popup when close button is clicked
  };

  return (
    <div className="login-bg">
      {error && (
        <div className={`error-popup ${showError ? "show" : ""}`}>
          <p className="error-message">{error}</p>
          <button className="close-btn" onClick={handleCloseError}>
            &times;
          </button>
        </div>
      )}
      <div className="login">
        <div className="login-header">
          <h1>Lyfi Login</h1>
        </div>

        <div className="group">
          <form onSubmit={handleSubmit}>
            <div className="input-container row">
              <label htmlFor="email" className="input-label">
                Username
              </label>
              <input
                type="email"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                id="email"
              />
              <span className="input-highlight"></span>
            </div>

            <div className="input-container row">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                id="password"
              />
              <span className="input-highlight"></span>
            </div>
            <Link className="login-back m-3" to="./../">
              Kembali
            </Link>
            <button type="submit" className="login-footer">
              Kirim
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
