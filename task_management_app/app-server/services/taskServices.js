const { ObjectId } = require('mongodb');
const { getDB } = require('../db/mongo');

const getAllTasks = async () => {
  const db = getDB();
  return await db.collection('tasks').find().toArray();
};

const createTask = async (task) => {
  const db = getDB();
  const result = await db.collection('tasks').insertOne(task);
  return result.insertedId;
};

const deleteTask = async (id) => {
  const db = getDB();
  return await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
};

const updateTask = async (id, updatedFields) => {
  const db = getDB();
  return await db.collection('tasks').updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedFields }
  );
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
};
