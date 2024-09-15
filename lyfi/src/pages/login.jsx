import React, { useState } from "react";
import LoginPage from "../components/login/login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./../components/Loading/Loading"; // Import komponen Loading

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State untuk loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading true saat mulai submit

    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/login",
        {
          email: email,
          password: password,
        }
      );

      localStorage.setItem("token", response.data.access_token);
      navigate("/admin");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Set loading false setelah proses selesai
    }
  };

  return (
    <>
      {loading ? (
        <Loading /> // Tampilkan komponen Loading saat state loading true
      ) : (
        <LoginPage
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          error={error}
        />
      )}
    </>
  );
};

export default Login;
