import React, { useState, useEffect } from "react";
import RegisterPage from "../components/Register/RegisterPage";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async () => {
    let item = { name, email, password };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      // Store user info in localStorage
      localStorage.setItem("user-info", JSON.stringify(data));
      
      // Redirect to the admin page
      navigate('/admin');

    } catch (error) {
      console.error("Error:", error);
      // Handle fetch error
    }
  };

  return (
    <>
      <RegisterPage 
        name={name} 
        password={password} 
        setName={setName} 
        setPassword={setPassword} 
        handleSubmit={handleSubmit}
        email={email} 
        setEmail={setEmail} 
      />
    </>
  );
};

export default Register;
