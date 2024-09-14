import React, { useState } from 'react';
import axios from 'axios';

function CreateClass() {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/classes', { title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Class Title"
      />
      <button type="submit">Create Class</button>
    </form>
  );
}

export default CreateClass;
