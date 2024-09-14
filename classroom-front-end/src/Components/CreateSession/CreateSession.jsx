// CreateSession.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateSession({ classId, unitId }) {
  const [title, setTitle] = useState('');
  const [lectures, setLectures] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/classes/${classId}/units/${unitId}/sessions`, {
      title,
      lectures: lectures.split(','),
    });
    setTitle('');
    setLectures('');
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
}

export default CreateSession;
