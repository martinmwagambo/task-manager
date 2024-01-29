// src/components/TaskList.js
import React from 'react';

const TaskList = ({ tasks, onDelete, onToggleComplete }) => {
  return (
    <ul className="list-disc mt-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex items-center justify-between p-2 border-b ${
            task.completed ? 'line-through text-gray-500' : 'text-black'
          }`}
        >
          <span>{task.name}</span>
          <div>
            <button
              onClick={() => onToggleComplete(task.id)}
              className="mr-2 px-2 py-1 bg-green-500 text-white rounded"
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
