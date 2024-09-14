import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../Navbar/Navbar';

function Home() {
  const role = localStorage.getItem('role'); // Get user role from local storage

  return (
    <>
    <Navbar/>
      <div className="home-container">
        <h1>Welcome to the Virtual Classroom</h1>
        <p>Your gateway to a world of knowledge and learning.</p>
        <div className="home-buttons">
          {role === 'student' && (
            <>
              <Link to="/classes" className="home-button">View Classes</Link>
            </>
          )}
          {role === 'instructor' && (
            <>
              <Link to="/create-class" className="home-button">Create Class</Link>
              <Link to="/classes/:classId/units" className="home-button">Create Unit</Link>
              <Link to="/classes/:classId/units/:unitId/sessions" className="home-button">Create Session</Link>
            </>
          )}
          {role === 'admin' && (
            <>
              <Link to="/create-class" className="home-button">Create Class</Link>
              <Link to="/classes/:classId/units" className="home-button">Create Unit</Link>
              <Link to="/classes/:classId/units/:unitId/sessions" className="home-button">Create Session</Link>
            </>
          )}
          {!role && (
            <>
              <Link to="/login" className="home-button">Login</Link>
              <Link to="/register" className="home-button">Register</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
