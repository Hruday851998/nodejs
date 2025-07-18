const express = require('express');
const cors = require('cors');
const app = express();
const port = 5050;

app.use(cors());

const data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

const interests=[
  {id:1, name: 'Sports'},
  {id:2, name: 'music'},
];

app.get('/api/items', (req, res) => {
  res.json(data);
});

app.get('/api/interests', (req, res) => {
  res.json(interests);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
