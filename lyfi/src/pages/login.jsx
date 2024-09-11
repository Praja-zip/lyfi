import React, { useState, useEffect } from "react";
import LoginPage from "../components/login/login";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     navigate('/admin');
  //   }
  // }, [navigate]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('submit');
    
    try {
      const response = await axios.post('http://localhost:8000/api/admin/login', {
        email: email,
        password: password
      });
      console.log(response.data);

      // Save token to localStorage
      localStorage.setItem('token', response.data.access_token);

      // Redirect to dashboard
      navigate('/admin');
      
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <LoginPage
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        error={error}
      />
    </>
  );
};

export default Login;
