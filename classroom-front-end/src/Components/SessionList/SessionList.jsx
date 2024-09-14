import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SessionList({ unitId }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const response = await axios.get(`http://localhost:5000/units/${unitId}/sessions`);
      setSessions(response.data);
    };
    fetchSessions();
  }, [unitId]);

  return (
    <div>
      <h1>Sessions</h1>
      <ul>
        {sessions.map((session) => (
          <li key={session._id}>{session.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SessionList;
