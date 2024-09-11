import React from "react";
import "./login.css";

const LoginPage = ({ email, password, setEmail, setPassword, handleSubmit, error }) => {
  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Lify Login</h1>
      </header>

      <main className="login-body">
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
      </main>

      <footer className="login-footer">
        <button onClick={handleSubmit} className="submit-button">
          Kirim
        </button>
      </footer>
    </div>
  );
};

export default LoginPage;
