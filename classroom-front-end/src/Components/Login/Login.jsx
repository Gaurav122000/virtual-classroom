import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar from '../Navbar/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      alert('Login successful!');
      navigate('/classes');
      console.log(response.data);
    } catch (error) {
      console.error('Login Failed', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <Navbar />
      <form className="login-form" onSubmit={handleSubmit}>
        <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="form-button" type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
