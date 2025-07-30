const taskService = require('../services/taskServices');

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createTask = async (req, res) => {
  try {
    const task = req.body;
    const id = await taskService.createTask(task);
    res.status(201).json({ message: 'Task stored successfully', id });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await taskService.deleteTask(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    const result = await taskService.updateTask(id, updatedFields);

    if (result.modifiedCount === 1) {
      res.json({ message: 'Task updated successfully' });
    } else {
      res.status(404).json({ error: 'Task not found or not updated' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
};
