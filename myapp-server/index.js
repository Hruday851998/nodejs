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

const pendingInterests=[
  {id:1, name: 'Sports', date: '06-10-2025'},
  {id:2, name: 'music', date:'07-19-2025'},
  {id:2, name: 'dance', date:'05-19-2025'},
];


app.get('/api/items', (req, res) => {
  res.json(data);
});

app.get('/api/interests', (req, res) => {
  res.json(interests);
});

const isPendingInterest = (dateStr, days) => {
  const [month, day, year] = dateStr.split('-').map(Number);
  const interestDate = new Date(year, month - 1, day);
  const today=new Date();
  //convert milli seconds to one day and comparing with the days variable in this function
  if(((today-interestDate)/(1000*60*60*24))>days){
    return true;
  }
  return false;
};

app.get('/api/pendinginterests', (req, res) => {
  const isOlderThanAmonth = pendingInterests.filter(interest => isPendingInterest(interest.date,30));
  res.json(isOlderThanAmonth);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
