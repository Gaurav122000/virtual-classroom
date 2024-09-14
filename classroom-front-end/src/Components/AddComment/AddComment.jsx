import React, { useState, useEffect } from 'react'; // Importing React and useState, useEffect hooks
import axios from 'axios'; // Importing axios for making HTTP requests
import { io } from 'socket.io-client'; // Importing socket.io-client for real-time communication

const socket = io('http://localhost:5000'); // Initializing socket connection

function AddComment({ sessionId }) {
  const [text, setText] = useState(''); // State for comment text input
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    socket.on('comment', (newComment) => {
      console.log('New comment received:', newComment); // Log new comment received via socket
      // Handle the new comment (e.g., update the state to display it)
    });

    return () => {
      socket.off('comment'); // Cleanup socket listener on component unmount
    };
  }, []); // Empty dependency array means this effect runs once on component mount

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors
    try {
      const response = await axios.post(`http://localhost:5000/sessions/${sessionId}/comments`, { text }); // Sending comment to server
      socket.emit('comment', response.data); // Emitting new comment via socket
      setText(''); // Clear text input
    } catch (err) {
      setError('Failed to add comment'); // Set error message
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <form onSubmit={handleSubmit}> {/* Form submission handler */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment" // Input field for comment text
        disabled={loading} // Disable input while loading
      />
      <button type="submit" disabled={loading}>Add Comment</button> {/* Submit button */}
      {error && <p>{error}</p>} {/* Display error message if any */}
    </form>
  );
}

export default AddComment; // Exporting AddComment component as default
