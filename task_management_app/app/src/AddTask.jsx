import { useState} from 'react';

function AddTask({ tasks, setTasks }){

    const [name, setName] = useState('');
    const [status, setStatus] = useState('pending');
    const statusOptions = [
    'pending',
    'in progress',
    'completed',
    'on hold',
    'cancelled'
  ];

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

    return(
        <div>
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
        </div>
    );
}

export default AddTask;