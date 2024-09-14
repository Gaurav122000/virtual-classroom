import React from 'react'; // Importing React library
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom for navigation
import './Home.css'; // Importing CSS file for styling
import Navbar from '../Navbar/Navbar'; // Importing Navbar component

function Home() {
  const role = localStorage.getItem('role'); // Get user role from local storage

  return (
    <>
      <Navbar/> {/* Rendering Navbar component */}
      <div className="home-container"> {/* Main container for home page */}
        <h1>Welcome to the Virtual Classroom</h1> {/* Main heading */}
        <p>Your gateway to a world of knowledge and learning.</p> {/* Subheading */}
        <div className="home-buttons"> {/* Container for buttons */}
          {role === 'student' && ( // If user role is student
            <>
              <Link to="/classes" className="home-button">View Classes</Link> {/* Link to view classes */}
            </>
          )}
          {role === 'instructor' && ( // If user role is instructor
            <>
              <Link to="/create-class" className="home-button">Create Class</Link> {/* Link to create class */}
              <Link to="/classes/:classId/units" className="home-button">Create Unit</Link> {/* Link to create unit */}
              <Link to="/classes/:classId/units/:unitId/sessions" className="home-button">Create Session</Link> {/* Link to create session */}
            </>
          )}
          {role === 'admin' && ( // If user role is admin
            <>
              <Link to="/create-class" className="home-button">Create Class</Link> {/* Link to create class */}
              <Link to="/classes/:classId/units" className="home-button">Create Unit</Link> {/* Link to create unit */}
              <Link to="/classes/:classId/units/:unitId/sessions" className="home-button">Create Session</Link> {/* Link to create session */}
            </>
          )}
          {!role && ( // If no role is found
            <>
              <Link to="/login" className="home-button">Login</Link> {/* Link to login */}
              <Link to="/register" className="home-button">Register</Link> {/* Link to register */}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home; // Exporting Home component as default
