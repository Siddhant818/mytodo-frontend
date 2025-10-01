import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    setTodos([...todos, text]);
    setText("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My To-Do List</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
