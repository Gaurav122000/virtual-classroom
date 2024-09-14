import React, { useEffect, useState } from 'react'; // Importing React and useEffect, useState hooks
import axios from 'axios'; // Importing axios for making HTTP requests

function SessionList({ unitId }) {
  const [sessions, setSessions] = useState([]); // State to store sessions

  useEffect(() => {
    const fetchSessions = async () => {
      const response = await axios.get(`http://localhost:5000/units/${unitId}/sessions`); // Fetching sessions from server
      setSessions(response.data); // Updating state with fetched sessions
    };
    fetchSessions(); // Calling the fetchSessions function
  }, [unitId]); // Dependency array to re-run effect when unitId changes

  return (
    <div>
      <h1>Sessions</h1> {/* Heading for sessions list */}
      <ul>
        {sessions.map((session) => ( // Mapping through sessions array
          <li key={session._id}>{session.title}</li> // Displaying each session title
        ))}
      </ul>
    </div>
  );
}

export default SessionList; // Exporting SessionList component as default
