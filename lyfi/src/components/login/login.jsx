import React from "react";
import "./login.css";

const LoginPage = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  error,
}) => {
  return (
    <div className="login-bg">
      <div className="login">
        <div className="login-header">
          <h1>Lify Login</h1>
        </div>

        <div className="group">
          <form onSubmit={handleSubmit}>
            <div className="input-container row">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
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

            {error && <p className="error-message">{error}</p>}

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
