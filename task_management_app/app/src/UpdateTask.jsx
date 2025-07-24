function UpdateTask({ task, statusOptions, tasks, setTasks }) {
  const updateTask = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3030/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        setTasks(tasks.map(t => (t._id === id ? { ...t, status: newStatus } : t)));
      } else {
        console.error('Update failed:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
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
