import React, { useState, useRef } from 'react';

export default function CourseApp() {
  const [courses, setCourses] = useState([
    "Processors & Controllers",
    "Object Oriented Prog.",
    "Database Mgmt System",
    "Artificial Intelligence",
    "Frontend Web Dev",
    "Operating Systems"
  ]);

  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleSort = () => {
    const _courses = [...courses];
    const draggedItemContent = _courses.splice(dragItem.current, 1)[0];
    _courses.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = dragOverItem.current;
    dragOverItem.current = null;
    setCourses(_courses);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: #ffffff; }
        .draggable-item:hover { background-color: #f0f0f0 !important; }
        .draggable-item:active { background-color: #e0e0e0 !important; border-color: #000 !important; }
      `}</style>

      {/* Main Container - Centered, White Background, Black Text */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff',
        color: '#f6f1f1ff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '60px',
        fontFamily: 'Segoe UI, sans-serif',
        zIndex: 9999
      }}>
        
        {/* BOX 1: DRAGGABLE LIST */}
        <div style={{
          width: '320px',
          height: '500px',
          border: '3px solid #f3efefff', /* Black Outline */
          borderRadius: '12px',
          padding: '25px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)' /* Soft shadow for "good" feel */
        }}>
          <h3 style={{ 
            textAlign: 'center', 
            borderBottom: '2px solid #000000', 
            paddingBottom: '15px', 
            marginTop: 0,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Drag to Reorder
          </h3>
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
            {courses.map((item, index) => (
              <div
                key={index}
                className="draggable-item"
                draggable
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  padding: '15px',
                  marginBottom: '10px',
                  background: '#f9f9f9', /* Light grey item bg */
                  cursor: 'grab',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  color: '#000'
                }}
              >
                <span style={{ marginRight: '15px', fontSize: '1.2em', color: '#666' }}>☰</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* BOX 2: RESULT LIST */}
        <div style={{
          width: '320px',
          height: '500px',
          border: '3px solid #f3f2f2ff', /* Black Outline */
          borderRadius: '12px',
          padding: '25px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            textAlign: 'center', 
            borderBottom: '2px solid #efebebff', 
            paddingBottom: '15px', 
            marginTop: 0,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Current Order
          </h3>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <ol style={{ paddingLeft: '25px', fontSize: '1.1em', lineHeight: '1.6', color: '#000' }}>
              {courses.map((item, i) => (
                <li key={i} style={{ marginBottom: '12px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>

      </div>
    </>
  );
}