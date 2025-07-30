import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask as deleteTaskAPI } from '../service/TasksService';

function DeleteTask({ taskId, tasks, setTasks }) {

  const deleteTask = async (id) => {
    try {
      await deleteTaskAPI(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
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
