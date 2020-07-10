const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();
const monsters = require('../db/monsters');

// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));

app.get('/allMonsters', function (req, res) {
  res.status(200).json(monsters);
});

app.get('/monster/:name', function (req, res) {
  const param = req.params;
  console.log(param.name);
  res.status(200).json(monsters[param.name]);
});

app.get('*', (req, res) => {
  console.log(path.join(__dirname, '../public/index.html'));
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(8080, () => console.log(`Little server is listening`));
