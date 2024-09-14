import React, { useState, useEffect } from 'react'; // Importing React and useState, useEffect hooks
import { Link, useNavigate } from 'react-router-dom'; // Importing Link and useNavigate from react-router-dom for navigation
import './Navbar.css'; // Importing CSS file for styling

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from local storage
    if (token) {
      setIsLoggedIn(true); // Set isLoggedIn to true if token exists
    }
  }, []); // Empty dependency array means this effect runs once on component mount

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    localStorage.removeItem('role'); // Remove role from local storage
    setIsLoggedIn(false); // Set isLoggedIn to false
    alert('Logout successful!'); // Alert user of successful logout
    navigate('/login'); // Navigate to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Virtual Class</Link> {/* Logo link to home page */}
        <ul className="nav-menu">
          {isLoggedIn ? ( // If user is logged in
            <>
              <li className="nav-item">
                <Link to="/classes" className="nav-links">Classes</Link> {/* Link to classes page */}
              </li>
              <li className="nav-item">
                <button className="nav-links" onClick={handleLogout}>Logout</button> {/* Logout button */}
              </li>
            </>
          ) : ( // If user is not logged in
            <>
              <li className="nav-item">
                <Link to="/register" className="nav-links">Register</Link> {/* Link to register page */}
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-links">Login</Link> {/* Link to login page */}
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar; // Exporting Navbar component as default
