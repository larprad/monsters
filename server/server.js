const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();
const errorHandler = require('errorhandler');
const api = require('./api');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('server/monsterDb.sqlite');

db.run(
  'create table if not exists monsters (id integer primary key, name text unique not null, slug text unique not null, description text, image text)',
  (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Database is ready');
    }
  }
);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));

app.use('/', api);

app.use(errorHandler);

app.listen(8080, () => console.log(`Little server is listening`));
