import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import Navbar from '../Navbar/Navbar';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', { name, email, password, role });
      alert('Registration successful!');
      navigate('/login');
      console.log(response.data);
    } catch (error) {
      console.error('Registration Failed', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <form className="register-form" onSubmit={handleSubmit}>
        <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>
        <button className="form-button" type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;
