import React, { useState } from 'react'; // Importing React and useState hook
import Navbar from '../Navbar/Navbar.jsx'; // Importing Navbar component
import { Link, useNavigate } from 'react-router-dom'; // Importing Link and useNavigate from react-router-dom for navigation
import axios from 'axios'; // Importing axios for making HTTP requests
import './CreateClass.css'; // Importing CSS file for styling

function CreateClass() {
  const [title, setTitle] = useState(''); // State for class title input
  const [classId, setClassId] = useState(''); // State for storing created class ID
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const token = localStorage.getItem('token'); // Get token from local storage
    try {
      const response = await axios.post('http://localhost:5000/classes', { title }, {
        headers: {
          'Authorization': `Bearer ${token}` // Set authorization header with token
        }
      });
      setTitle(''); // Clear title input
      setClassId(response.data._id); // Set class ID with response data
      alert('Class created successfully!'); // Alert user of successful class creation
      navigate('/'); // Navigate to home page
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('You are not authorized to create a class.'); // Alert user if not authorized
      } else {
        console.error('Error creating class', error); // Log error
        alert('Failed to create class. Please try again.'); // Alert user of failed class creation
      }
    }
  };

  return (
    <>
      <Navbar /> {/* Rendering Navbar component */}
      <div className="class-form-container">
        <form onSubmit={handleSubmit}> {/* Form submission handler */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Class Title" // Input field for class title
          />
          <button type="submit">Create Class</button> {/* Submit button */}
        </form>
        {classId && <p className="class-id">Class ID: {classId}</p>} {/* Display created class ID */}
      </div>
    </>
  );
}

export default CreateClass; // Exporting CreateClass component as default
