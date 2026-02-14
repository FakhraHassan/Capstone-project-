import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
      const res = await axios.get(`${API_URL}/api/tasks/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.log("Error fetching tasks:", err);
      if (err.response && err.response.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const addTask = async () => {
    if (!title) return;
    try {
      const token = localStorage.getItem("authToken");
      const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
      await axios.post(`${API_URL}/api/tasks/`, {
        title,
        description: "",
        completed: false,
        deadline: deadline || null,
      }, {
        headers: { Authorization: `Token ${token}` },
      });
      setTitle("");
      setDeadline("");
      fetchTasks();
    } catch (err) {
      console.log("Error adding task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
      await axios.delete(`${API_URL}/api/tasks/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };

  const toggleTask = async (task) => {
    try {
      const token = localStorage.getItem("authToken");
      const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
      await axios.patch(`${API_URL}/api/tasks/${task.id}/`, {
        completed: !task.completed
      }, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.log("Error updating task:", err);
    }
  };

  const formatDeadline = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const isOverdue = (task) => {
    if (!task.deadline || task.completed) return false;
    return new Date(task.deadline) < new Date();
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="fade-in">
      {/* Navbar */}
      <nav className="kitty-header" style={{ marginBottom: '2rem', padding: '1rem 2rem', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Task Manager</h1>
        <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Logout</button>
      </nav>

      <div className="kitty-container" style={{ paddingTop: '1rem', maxWidth: '1000px' }}>
        <div className="kitty-panel mb-6">
          <div className="kitty-header">
            <h2>Add New Task</h2>
            <div className="text-secondary">Welcome Back! 🌸</div>
          </div>

          <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
            <div style={{ flex: 2, minWidth: '200px' }}>
              <input
                className="input-field"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done? 🎀"
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <input
                className="input-field"
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={{ padding: '0.8rem' }}
              />
            </div>
            <button onClick={addTask} className="btn">Add Task</button>
          </div>
        </div>

        <div className="kitty-panel">
          <h3 className="section-title">Active Tasks 📝</h3>
          <ul>
            {activeTasks.map((task) => (
              <li key={task.id} className={isOverdue(task) ? "task-overdue" : ""}>
                <div className="flex items-center gap-4" style={{ flex: 1 }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task)}
                    style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 600 }}>{task.title}</span>
                    {task.deadline && (
                      <span style={{ fontSize: '0.8rem', color: isOverdue(task) ? 'var(--danger)' : 'var(--text-secondary)' }}>
                        {isOverdue(task) ? '⚠️ Overdue: ' : '🕒 Due: '}
                        {formatDeadline(task.deadline)}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="btn btn-danger"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '15px' }}
                >
                  Delete ✖️
                </button>
              </li>
            ))}
            {activeTasks.length === 0 && (
              <div className="text-center text-secondary" style={{ padding: '1rem' }}>
                No active tasks! You are free! 🦋
              </div>
            )}
          </ul>

          {completedTasks.length > 0 && (
            <>
              <h3 className="section-title">Completed Tasks ✅</h3>
              <ul>
                {completedTasks.map((task) => (
                  <li key={task.id} className="task-completed">
                    <div className="flex items-center gap-4" style={{ flex: 1 }}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task)}
                        style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ textDecoration: 'line-through' }}>{task.title}</span>
                        {task.deadline && (
                          <span style={{ fontSize: '0.8rem' }}>
                            Finished! 🌟
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="btn btn-danger"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '15px' }}
                    >
                      Delete ✖️
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
