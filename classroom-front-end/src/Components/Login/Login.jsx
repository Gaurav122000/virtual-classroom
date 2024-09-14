import React, { useState } from 'react'; // Importing React and useState hook
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation
import './Login.css'; // Importing CSS file for styling
import Navbar from '../Navbar/Navbar'; // Importing Navbar component

function Login() {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password }); // Sending login request to server
      localStorage.setItem('token', response.data.token); // Storing token in local storage
      localStorage.setItem('role', response.data.role); // Storing role in local storage
      alert('Login successful!'); // Alerting user of successful login
      navigate('/classes'); // Navigating to classes page
      //console.log(response.data); // Logging response data
    } catch (error) {
      console.error('Login Failed', error); // Logging error
      alert('Login failed. Please check your credentials.'); // Alerting user of failed login
    }
  };

  return (
    <>
      <Navbar /> {/* Rendering Navbar component */}
      <form className="login-form" onSubmit={handleSubmit}> {/* Form submission handler */}
        <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /> {/* Email input field */}
        <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /> {/* Password input field */}
        <button className="form-button" type="submit">Login</button> {/* Submit button */}
      </form>
    </>
  );
}

export default Login; // Exporting Login component as default
