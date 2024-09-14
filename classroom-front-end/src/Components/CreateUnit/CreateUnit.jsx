import React, { useState } from 'react'; // Importing React and useState hook
import Navbar from '../Navbar/Navbar'; // Importing Navbar component
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation
import axios from 'axios'; // Importing axios for making HTTP requests
import './CreateUnit.css'; // Importing CSS file for styling

function CreateUnit() {
  const [title, setTitle] = useState(''); // State for unit title input
  const [classId, setClassId] = useState(''); // State for class ID input
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const token = localStorage.getItem('token'); // Get token from local storage
    try {
      await axios.post(`http://localhost:5000/classes/${classId}/units`, { title }, {
        headers: {
          'Authorization': `Bearer ${token}` // Set authorization header with token
        }
      });
      setTitle(''); // Clear title input
      alert('Unit created successfully!'); // Alert user of successful unit creation
      navigate('/'); // Navigate to home page
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('You are not authorized to create a unit.'); // Alert user if not authorized
      } else {
        console.error('Error creating unit', error); // Log error
        alert('Failed to create unit. Please try again.'); // Alert user of failed unit creation
      }
    }
  };

  return (
    <>
      <Navbar /> {/* Rendering Navbar component */}
      <form onSubmit={handleSubmit} className="unit-form-container"> {/* Form submission handler */}
        <input
          type="text"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          placeholder="Class ID" // Input field for class ID
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Unit Title" // Input field for unit title
        />
        <button type="submit">Create Unit</button> {/* Submit button */}
      </form>
    </>
  );
}

export default CreateUnit; // Exporting CreateUnit component as default
