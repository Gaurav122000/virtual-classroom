// CreateUnit.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateUnit({ classId }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/classes/${classId}/units`, { title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Unit Title"
      />
      <button type="submit">Create Unit</button>
    </form>
  );
}

export default CreateUnit;
