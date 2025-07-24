import { useState, useEffect } from 'react';
import AddTask from './AddTask';
import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';


function App() {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div>
      <h2>Task Manager</h2>
      <AddTask setTasks={setTasks} tasks={tasks} />
      <h3>My Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {task.name} —&nbsp;
              <UpdateTask
                task={task}
                statusOptions={statusOptions}
                tasks={tasks}
                setTasks={setTasks}
              />
              <DeleteTask 
                taskId={task._id}  
                tasks={tasks}
                setTasks={setTasks}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
