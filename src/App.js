import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, done: !t.done } : t
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <h1 className="title">✨ My To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 ? (
          <p className="empty">No tasks yet. Add something! ✅</p>
        ) : (
          tasks.map((t, index) => (
            <li key={index} className={t.done ? "done" : ""}>
              <span onClick={() => toggleTask(index)}>{t.text}</span>
              <button className="delete" onClick={() => deleteTask(index)}>
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
