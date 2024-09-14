import React, { useState } from 'react'; // Importing React and useState hook
import axios from 'axios'; // Importing axios for making HTTP requests
import './CreateSession.css'; // Importing CSS file for styling
import Navbar from '../Navbar/Navbar'; // Importing Navbar component
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation

function CreateSession() {
  const [classId, setClassId] = useState(''); // State for class ID input
  const [unitId, setUnitId] = useState(''); // State for unit ID input
  const [title, setTitle] = useState(''); // State for session title input
  const [lectures, setLectures] = useState(''); // State for lectures input
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const token = localStorage.getItem('token'); // Get token from local storage
    try {
      await axios.post(`http://localhost:5000/classes/${classId}/units/${unitId}/sessions`, {
        title,
        lectures: lectures.split(','), // Split lectures by comma
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Set authorization header with token
        }
      });
      setClassId(''); // Clear class ID input
      setUnitId(''); // Clear unit ID input
      setTitle(''); // Clear title input
      setLectures(''); // Clear lectures input
      alert('Session created successfully!'); // Alert user of successful session creation
      navigate('/'); // Navigate to home page
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('You are not authorized to create a session.'); // Alert user if not authorized
      } else {
        console.error('Error creating session', error); // Log error
        alert('Failed to create session. Please try again.'); // Alert user of failed session creation
      }
    }
  };

  return (
    <>
      <Navbar /> {/* Rendering Navbar component */}
      <form onSubmit={handleSubmit} className="form-container"> {/* Form submission handler */}
        <input
          type="text"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          placeholder="Class ID" // Input field for class ID
        />
        <input
          type="text"
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
          placeholder="Unit ID" // Input field for unit ID
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Session Title" // Input field for session title
        />
        <input
          type="text"
          value={lectures}
          onChange={(e) => setLectures(e.target.value)}
          placeholder="Lectures (comma separated)" // Input field for lectures
        />
        <button type="submit">Create Session</button> {/* Submit button */}
      </form>
    </>
  );
}

export default CreateSession; // Exporting CreateSession component as default
