import React, { Component } from "react";

class TaskList extends Component {
  render() {
    const { tasks, onDelete, onToggleComplete, onProgress } = this.props;

    return (
      <ul className="list-disc mt-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-2 border-b ${
              task.completed ? "line-through text-gray-500" : "text-black"
            }`}
          >
            <span>{task.name}</span>
            <div>
              <button
                onClick={() => onProgress(task.id)}
                className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
              >
                {task.progress === "In Progress" ? "In Progress" : "To Do"}
              </button>

              <button
                onClick={() => onToggleComplete(task.id)}
                className="mr-2 px-2 py-1 bg-green-500 text-white rounded"
              >
                {task.completed ? "Undo" : "Complete"}
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
  }
}

export default TaskList;
