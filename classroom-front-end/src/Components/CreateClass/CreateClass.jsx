import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar.jsx'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateClass.css';

function CreateClass() {
  const [title, setTitle] = useState('');
  const [classId, setClassId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5000/classes', { title }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTitle('');
      setClassId(response.data._id);
      alert('Class created successfully!');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('You are not authorized to create a class.');
      } else {
        console.error('Error creating class', error);
        alert('Failed to create class. Please try again.');
      }
    }
  };

  return (
    <>
    <Navbar/>
      <div className="class-form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Class Title"
          />
          <button type="submit">Create Class</button>
        </form>
        {classId && <p className="class-id">Class ID: {classId}</p>}
      </div>
    </>
  );
}

export default CreateClass;
