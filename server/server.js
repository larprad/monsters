const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.get('/', function (req, res) {
  res.status(200).send('hello there!');
});

app.listen(3000);
