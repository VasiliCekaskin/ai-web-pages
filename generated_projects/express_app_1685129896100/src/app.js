const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/move/:direction', (req, res) => {
  const direction = req.params.direction;
  // logic for moving figure in specified direction
  res.send(`Moving figure ${direction}`);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});