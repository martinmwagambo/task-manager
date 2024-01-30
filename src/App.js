import React, { Component } from "react";
import TaskList from "./components/Tasklist";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      newTask: "",
      currentTab: "all",
    };
  }

  handleAddTask = () => {
    const { newTask, tasks } = this.state;
    if (newTask.trim() !== "") {
      const newTaskObj = {
        id: new Date().getTime(),
        name: newTask,
        completed: false,
        progress: "",
        deleted: false,
      };
      this.setState({
        tasks: [...tasks, newTaskObj],
        newTask: "",
      });
      window.alert("Task added successfully in the Task Manager");
    }
  };

  handleToggleComplete = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed, progress: "" }
          : task
      ),
    }));
  };

  handleProgress = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              progress: task.progress === "" ? "In Progress" : "",
              completed: false,
            }
          : task
      ),
    }));
  };

  handleDeleteTask = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId ? { ...task, deleted: true } : task
      ),
    }));
  };

  filterTasks = () => {
    const { currentTab, tasks } = this.state;
    switch (currentTab) {
      case "inProgress":
        return tasks.filter(
          (task) => task.progress === "In Progress" && !task.completed
        );
      case "completed":
        return tasks.filter(
          (task) => task.completed && task.progress !== "In Progress"
        );
      case "deleted":
        return tasks.filter((task) => task.deleted);
      default:
        return tasks.filter(
          (task) =>
            !task.deleted && !task.completed && task.progress !== "In Progress"
        );
    }
  };

  render() {
    const { newTask, currentTab } = this.state;

    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-gray-300 p-4 w-1/4">
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => this.setState({ currentTab: "all" })}
                className={`w-full text-left py-2 px-4 ${
                  currentTab === "all" && "bg-blue-500 text-white"
                }`}
              >
                Task Manager
              </button>
            </li>
            <li>
              <button
                onClick={() => this.setState({ currentTab: "newTask" })}
                className={`w-full text-left py-2 px-4 ${
                  currentTab === "newTask" && "bg-blue-500 text-white"
                }`}
              >
                New Task
              </button>
            </li>
            <li>
              <button
                onClick={() => this.setState({ currentTab: "inProgress" })}
                className={`w-full text-left py-2 px-4 ${
                  currentTab === "inProgress" && "bg-blue-500 text-white"
                }`}
              >
                In Progress
              </button>
            </li>
            <li>
              <button
                onClick={() => this.setState({ currentTab: "completed" })}
                className={`w-full text-left py-2 px-4 ${
                  currentTab === "completed" && "bg-blue-500 text-white"
                }`}
              >
                Completed
              </button>
            </li>
            <li>
              <button
                onClick={() => this.setState({ currentTab: "deleted" })}
                className={`w-full text-left py-2 px-4 ${
                  currentTab === "deleted" && "bg-blue-500 text-white"
                }`}
              >
                Deleted
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4">
          <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

          {/* New Task Form */}
          {currentTab === "newTask" && (
            <div className="mb-4">
              <label className="block mb-2">New Task:</label>
              <div className="flex">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => this.setState({ newTask: e.target.value })}
                  className="flex-grow border p-2 mr-2"
                />
                <button
                  onClick={this.handleAddTask}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add Task
                </button>
              </div>
            </div>
          )}

          {/* Task List */}
          {currentTab !== "newTask" && (
            <TaskList
              tasks={this.filterTasks()}
              onDelete={this.handleDeleteTask}
              onToggleComplete={this.handleToggleComplete}
              onProgress={this.handleProgress}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
