import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteTask({ taskId, tasks, setTasks }) {
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3030/api/tasks/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(tasks.filter(task => task._id !== id));
      } else {
        console.error('Delete failed:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <IconButton
      aria-label="delete"
      onClick={() => {
        if (window.confirm('Are you sure you want to delete this task?')) {
          deleteTask(taskId);
        }
      }}
      color="error"
    >
      <DeleteIcon />
    </IconButton>
  );
}

export default DeleteTask;
