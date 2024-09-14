import React, { useEffect, useState } from 'react'; // Importing React and useEffect, useState hooks
import axios from 'axios'; // Importing axios for making HTTP requests
import Navbar from '../Navbar/Navbar'; // Importing Navbar component
import './ClassList.css'; // Importing CSS file for styling

function ClassList() {
  const [classes, setClasses] = useState([]); // State to store classes

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await axios.get('http://localhost:5000/classes'); // Fetching classes from server
      setClasses(response.data); // Updating state with fetched classes
    };
    fetchClasses(); // Calling the fetchClasses function
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <>
      <Navbar /> {/* Rendering Navbar component */}
      <div className="class-list-container">
        <h1>Classes</h1> {/* Heading for classes list */}
        <ul className="class-list">
          {classes.map((classItem) => ( // Mapping through classes array
            <li key={classItem._id} className="class-item"> {/* List item for each class */}
              <h2>{classItem.title}</h2> {/* Displaying class title */}
              <ul className="unit-list">
                {classItem.units.map((unit) => ( // Mapping through units array
                  <li key={unit._id} className="unit-item"> {/* List item for each unit */}
                    <h3>{unit.title}</h3> {/* Displaying unit title */}
                    <ul className="session-list">
                      {unit.sessions.map((session) => ( // Mapping through sessions array
                        <li key={session._id} className="session-item"> {/* List item for each session */}
                          <h4>{session.title}</h4> {/* Displaying session title */}
                          <p>Lectures: {session.lectures.join(', ')}</p> {/* Displaying lectures */}
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

export default ClassList; // Exporting ClassList component as default
