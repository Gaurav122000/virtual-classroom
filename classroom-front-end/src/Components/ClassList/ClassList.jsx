import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './ClassList.css'; // Import the CSS file

function ClassList() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await axios.get('http://localhost:5000/classes');
      setClasses(response.data);
    };
    fetchClasses();
  }, []);

  return (
    <>
      <Navbar />
      <div className="class-list-container">
        <h1>Classes</h1>
        <ul className="class-list">
          {classes.map((classItem) => (
            <li key={classItem._id} className="class-item">
              <h2>{classItem.title}</h2>
              <ul className="unit-list">
                {classItem.units.map((unit) => (
                  <li key={unit._id} className="unit-item">
                    <h3>{unit.title}</h3>
                    <ul className="session-list">
                      {unit.sessions.map((session) => (
                        <li key={session._id} className="session-item">
                          <h4>{session.title}</h4>
                          <p>Lectures: {session.lectures.join(', ')}</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ClassList;
