import React, { useState } from 'react'; // Importing React and useState hook
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation
import './Register.css'; // Importing CSS file for styling
import Navbar from '../Navbar/Navbar'; // Importing Navbar component

function Register() {
  const [name, setName] = useState(''); // State for name input
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [role, setRole] = useState('student'); // State for role selection, default is 'student'
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://localhost:5000/auth/register', { name, email, password, role }); // Sending registration request to server
      alert('Registration successful!'); // Alerting user of successful registration
      navigate('/login'); // Navigating to login page
      console.log(response.data); // Logging response data
    } catch (error) {
      console.error('Registration Failed', error); // Logging error
      alert('Registration failed. Please try again.'); // Alerting user of failed registration
    }
  };

  return (
    <>
      <Navbar /> {/* Rendering Navbar component */}
      <form className="register-form" onSubmit={handleSubmit}> {/* Form submission handler */}
        <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /> {/* Name input field */}
        <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /> {/* Email input field */}
        <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /> {/* Password input field */}
        <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}> {/* Role selection dropdown */}
          <option value="student">Student</option> {/* Option for student role */}
          <option value="instructor">Instructor</option> {/* Option for instructor role */}
          <option value="admin">Admin</option> {/* Option for admin role */}
        </select>
        <button className="form-button" type="submit">Register</button> {/* Submit button */}
      </form>
    </>
  );
}

export default Register; // Exporting Register component as default
