import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const BACKEND_URL = "https://mytodo-backend-o7ar.onrender.com"; // Your live backend

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all tasks on load
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/todos`)
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load tasks. Please check backend.");
        setLoading(false);
      });
  }, []);

  // Add a new task
  const addTask = () => {
    if (task.trim() === "") return;

    axios
      .post(`${BACKEND_URL}/todos`, { text: task })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setTask("");
      })
      .catch(() => setError("Failed to add task."));
  };

  // Toggle completion
  const toggleTask = (id) => {
    axios
      .put(`${BACKEND_URL}/todos/${id}`)
      .then((res) => {
        setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      })
      .catch(() => setError("Failed to update task."));
  };

  // Delete a task
  const deleteTask = (id) => {
    axios
      .delete(`${BACKEND_URL}/todos/${id}`)
      .then(() => {
        setTasks(tasks.filter((t) => t._id !== id));
      })
      .catch(() => setError("Failed to delete task."));
  };

  return (
    <div className="app">
      <h1 className="title">✨ My To-Do List</h1>

      {/* Input */}
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Task List */}
      <ul className="task-list">
        {loading ? (
          <p className="empty">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="empty">No tasks yet. Add something! ✅</p>
        ) : (
          tasks.map((t) => (
            <li key={t._id} className={t.done ? "done" : ""}>
              <span onClick={() => toggleTask(t._id)}>{t.text}</span>
              <button className="delete" onClick={() => deleteTask(t._id)}>
                ✖
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
