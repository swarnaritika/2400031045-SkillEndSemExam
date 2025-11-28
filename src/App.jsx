import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './App.css';

const initialCourses = [
  { id: 'c1', name: '1. Object Oriented-Java' },
  { id: 'c2', name: '2. Machine Learning' },
  { id: 'c3', name: '3. Operating System' },
  { id: 'c4', name: '4. FrontEnd WebDevelopment' },
  { id: 'c5', name: '5. Database Management' },
];

function App() {
  const [courses, setCourses] = useState(initialCourses);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(courses);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCourses(items);
  };

  return (
    <div className="main-container">
      {/* Box 1: Draggable List */}
      <div className="outline-box">
        <h2>Course List</h2>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="courses">
            {(provided) => (
              <ul 
                className="course-list" 
                {...provided.droppableProps} 
                ref={provided.innerRef}
              >
                {courses.map(({ id, name }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`course-item ${snapshot.isDragging ? 'dragging' : ''}`}
                      >
                        {name}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Box 2: Updated Order Display */}
      <div className="outline-box">
        <h2>Current Order</h2>
        <div className="status-content">
          {courses.map((course, index) => (
            <p key={course.id}>
              <strong>{index + 1}:</strong> {course.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;