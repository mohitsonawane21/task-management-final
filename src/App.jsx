import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");

  const addTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      title: task,
      priority,
      category,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setTasks([]);
  };

  const completedTasks = tasks.filter((item) => item.completed).length;

  return (
    <div className="app">
      <header className="header">
        <h1>
          Task<span>Buddy</span>
        </h1>
        <p>Your friendly task manager</p>
      </header>

      <main className="container">
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>General</option>
            <option>College</option>
            <option>Work</option>
            <option>Personal</option>
          </select>

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="progress-section">
          <div className="progress-text">
            <span>
              {completedTasks} of {tasks.length} tasks completed
            </span>

            {tasks.length > 0 && (
              <span>
                {Math.round((completedTasks / tasks.length) * 100)}%
              </span>
            )}
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width:
                  tasks.length === 0
                    ? "0%"
                    : `${(completedTasks / tasks.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="task-header">
          <h2>My Tasks</h2>

          {tasks.length > 0 && (
            <button className="clear-btn" onClick={clearAll}>
              Clear All
            </button>
          )}
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No tasks yet</h3>
              <p>Add your first task to get started.</p>
            </div>
          ) : (
            tasks.map((item) => (
              <div
                className={`task-card ${
                  item.completed ? "completed" : ""
                }`}
                key={item.id}
              >
                <div className="task-check">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(item.id)}
                  />
                </div>

                <div className="task-content">
                  <h3>{item.title}</h3>

                  <div className="task-meta">
                    <span className={`priority ${item.priority.toLowerCase()}`}>
                      {item.priority}
                    </span>

                    <span className="category">
                      {item.category}
                    </span>
                  </div>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(item.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;