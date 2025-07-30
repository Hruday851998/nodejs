import { updateTask as updateTaskAPI } from '../service/TasksService';

function UpdateTask({ task, statusOptions, tasks, setTasks }) {

  const updateTask = async (id, newStatus) => {
    try {
      await updateTaskAPI(id, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === id ? { ...t, status: newStatus } : t)));
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <select
      value={task.status}
      onChange={(e) => updateTask(task._id, e.target.value)}
    >
      {statusOptions.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

export default UpdateTask;
