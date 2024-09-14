import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function AddComment({ sessionId }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.on('comment', (newComment) => {
      console.log('New comment received:', newComment);
      // Handle the new comment (e.g., update the state to display it)
    });

    return () => {
      socket.off('comment');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`http://localhost:5000/sessions/${sessionId}/comments`, { text });
      socket.emit('comment', response.data);
      setText('');
    } catch (err) {
      setError('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>Add Comment</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default AddComment;
