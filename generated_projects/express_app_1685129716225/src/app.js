const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/move', (req, res) => {
  // Code to move random figure goes here
  res.send('Figure moved!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});