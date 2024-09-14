// CommentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:5000');

function CommentList({ sessionId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(`http://localhost:5000/sessions/${sessionId}/comments`);
      setComments(response.data);
    };
    fetchComments();

    // socket.on('comment', (comment) => {
    //   setComments((prevComments) => [...prevComments, comment]);
    // });

    // return () => {
    //   socket.off('comment');
    // };
  }, [sessionId]);

  return (
    <div>
      <h1>Comments</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
