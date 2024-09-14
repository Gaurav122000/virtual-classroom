import React, { useState } from 'react';
import axios from 'axios';
import './CreateSession.css';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

function CreateSession() {
  const [classId, setClassId] = useState('');
  const [unitId, setUnitId] = useState('');
  const [title, setTitle] = useState('');
  const [lectures, setLectures] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://localhost:5000/classes/${classId}/units/${unitId}/sessions`, {
        title,
        lectures: lectures.split(','),
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setClassId('');
      setUnitId('');
      setTitle('');
      setLectures('');
      alert('Session created successfully!');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('You are not authorized to create a session.');
      } else {
        console.error('Error creating session', error);
        alert('Failed to create session. Please try again.');
      }
    }
  };

  return (
    <>
      <Navbar/>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          placeholder="Class ID"
        />
        <input
          type="text"
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
          placeholder="Unit ID"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Session Title"
        />
        <input
          type="text"
          value={lectures}
          onChange={(e) => setLectures(e.target.value)}
          placeholder="Lectures (comma separated)"
        />
        <button type="submit">Create Session</button>
      </form>
    </>
  );
}

export default CreateSession;
