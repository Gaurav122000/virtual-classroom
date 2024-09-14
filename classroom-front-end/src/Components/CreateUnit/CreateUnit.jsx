import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateUnit.css';

function CreateUnit() {
  const [title, setTitle] = useState('');
  const [classId, setClassId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://localhost:5000/classes/${classId}/units`, { title }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTitle('');
      alert('Unit created successfully!');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('You are not authorized to create a unit.');
      } else {
        console.error('Error creating unit', error);
        alert('Failed to create unit. Please try again.');
      }
    }
  };

  return (
    <>
    <Navbar/>
      <form onSubmit={handleSubmit} className="unit-form-container">
        <input
          type="text"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          placeholder="Class ID"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Unit Title"
        />
        <button type="submit">Create Unit</button>
      </form>
    </>
  );
}

export default CreateUnit;
