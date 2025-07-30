import { useState} from 'react';
import { createTask } from '../service/TasksService';

function AddTask({ tasks,statusOptions, setTasks }){

    const [name, setName] = useState('');
    const [status, setStatus] = useState('pending');
    
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!name) return alert('Task name is required');
    try {
      const result = await createTask({ name, status });
      setTasks([...tasks, { name, status, _id: result.id }]);
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