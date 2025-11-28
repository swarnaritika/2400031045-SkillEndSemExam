import React, { useState, useRef } from 'react';
import './App.css';

const CourseListApp = () => {
  // 1. Define initial list of at least 5 courses
  const [courses, setCourses] = useState([
    "Processors and controllers",
    "Object oriented programming",
    "Database managament system",
    "Artifical intelligence",
    "Frontend web development",
    "Operating systems"
  ]);

  const dragItem = useRef();
  const dragOverItem = useRef();

  // 2. Handle Drag Start
  const handleDragStart = (e, position) => {
    dragItem.current = position;
  };

  // 3. Handle Drag Enter (Rearrange logic)
  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
    
    const coursesCopy = [...courses];
    const dragItemContent = coursesCopy[dragItem.current];
    
    coursesCopy.splice(dragItem.current, 1);
    coursesCopy.splice(dragOverItem.current, 0, dragItemContent);
    
    dragItem.current = position;
    setCourses(coursesCopy);
  };

  return (
    <div className="app-container">
      <h2>Course Reordering App</h2>
      <p>Drag and drop items to rearrange the priority.</p>

      {/* List Container */}
      <div className="course-list">
        {courses.map((item, index) => (
          <div
            key={index}
            className="course-item"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragOver={(e) => e.preventDefault()}
          >
            <span className="drag-icon">☰</span>
            {item}
          </div>
        ))}
      </div>

      {/* 4. Display Updated Order */}
      <div className="output-section">
        <h3>Current Order:</h3>
        <ol>
          {courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default CourseListApp;