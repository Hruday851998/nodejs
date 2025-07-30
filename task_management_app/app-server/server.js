require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db/mongo');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = process.env.PORT

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Server is running'));
app.use('/api/tasks', taskRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
