import React, { useState, useRef } from 'react';
import './App.css';

const CourseListApp = () => {
  const [courses, setCourses] = useState([
    "Processors and Controllers",
    "Object Oriented Programming",
    "Database Management System",
    "Artificial Intelligence",
    "Frontend Web Development",
    "Operating Systems"
  ]);

  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleDragStart = (e, position) => {
    dragItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    e.preventDefault();
    dragOverItem.current = position;
    
    const coursesCopy = [...courses];
    const dragItemContent = coursesCopy[dragItem.current];
    
    coursesCopy.splice(dragItem.current, 1);
    coursesCopy.splice(dragOverItem.current, 0, dragItemContent);
    
    dragItem.current = position;
    setCourses(coursesCopy);
  };

  return (
    <div className="centered-container">
      {/* Box 1: Draggable List */}
      <div className="outlined-box">
        <h2 className="box-title">Course Reordering App</h2>
        <p className="subtitle">Drag items to rearrange priority</p>
        
        <div className="list-content">
          {courses.map((item, index) => (
            <div
              key={index}
              className="draggable-item"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragOver={(e) => e.preventDefault()}
            >
              <span className="icon">☰</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Box 2: Result Output */}
      <div className="outlined-box">
        <h2 className="box-title">Current Order</h2>
        <div className="list-content">
          <ol className="result-list">
            {courses.map((course, idx) => (
              <li key={idx}>{course}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default CourseListApp;