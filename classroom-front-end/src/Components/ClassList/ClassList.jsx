import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Classes</h1>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem._id}>{classItem.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ClassList;
