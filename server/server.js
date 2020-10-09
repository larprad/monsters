const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('errorhandler');
const api = require('./api');
const sqlite3 = require('sqlite3');

const app = express();
const PORT = process.env.PORT || 8080;

const db = new sqlite3.Database('server/monsterDb.sqlite');
db.run(
  'create table if not exists monsters (id integer primary key, name text unique not null, slug text unique not null, description text, image text, date text)',
  (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Database is ready');
    }
  }
);

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../build')));

app.use('/', api);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Little server is listening on ${PORT}`));
console.log(`process env PORT: ${process.env.PORT}`);
