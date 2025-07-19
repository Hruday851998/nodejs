import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('pending');

  const statusOptions = [
    'pending',
    'in progress',
    'completed',
    'on hold',
    'cancelled'
  ];

  useEffect(() => {
    fetch("http://localhost:3030/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!name) return alert('Task name is required');
    const newTask = { name, status };

    try {
      const res = await fetch('http://localhost:3030/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) throw new Error('Failed to add task');

      const result = await res.json();
      setTasks([...tasks, { ...newTask, _id: result.id }]);
      setName('');
      setStatus('pending');
    } catch (err) {
      alert(err.message);
    }
  };

  async function deleteTask(id) {
    try {
      const response = await fetch(`http://localhost:3030/api/tasks/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setTasks(tasks.filter(task => task._id !== id));
      } else {
        console.error('Delete failed:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  async function updateTask(id, newStatus) {
    try {
      const response = await fetch(`http://localhost:3030/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        setTasks(tasks.map(task =>
          task._id === id ? { ...task, status: newStatus } : task
        ));
      } else {
        console.error('Update failed:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  return (
    <div>
      <h2>Task Manager</h2>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Task name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <button type="submit">Add Task</button>
      </form>

      <h3>My Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {task.name} —&nbsp;
              <select
                value={task.status}
                onChange={(e) => updateTask(task._id, e.target.value)}
              >
                {statusOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <button
                onClick={() => deleteTask(task._id)}
              >
                <DeleteIcon fontSize="2px"/>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
