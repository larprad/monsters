const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();
const errorHandler = require('errorhandler');

const sqlite3 = require('sqlite3');
const { nextTick } = require('process');
const db = new sqlite3.Database('server/monsterDb.sqlite');

db.run(
  'create table if not exists monsters (id integer primary key, name text unique not null, slug text unique not null, description text, image text)',
  (err) => {
    if (err) {
      throw err;
    } else {
      console.log('table is created');
    }
  }
);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));

// GET

app.get('/allMonsters', function (req, res) {
  db.all('select * from monsters', (err, monsters) => {
    res.status(200).json(monsters);
  });
});

app.get('/monster/:slug', function (req, res) {
  const param = req.params;
  db.get('select * from monsters where slug = $slug', { $slug: param.slug }, (err, monster) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json(monster);
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// POST

app.post('/monster', function (req, res, next) {
  const monster = req.body;
  db.run(
    'insert into monsters (name, slug, description, image) values ($name, $slug, $description, $image)',
    {
      $name: monster.name,
      $slug: monster.slug,
      $description: monster.description,
      $image: monster.img,
    },
    (err, row) => {
      if (err) {
        console.log('error in POST');
        if (err.errno === 19) {
          res.status(500).json('already existing');
        }
        console.log('going next with error');
        next(err);
      } else {
        console.log(`monster saving`);
        res.status(201).json('monster have been received');
      }
    }
  );
});

// PUT

app.put('/monster/:slug', function (req, res, next) {
  const monster = req.body;
  const param = req.params;
  console.log('PUT body:');
  db.run(
    'update monsters set name = $name, slug = $slug, description = $description, image = $image where slug = $param',
    {
      $name: monster.name,
      $description: monster.description,
      $slug: monster.slug,
      $image: monster.img,
      $param: param.slug,
    },
    (err, row) => {
      if (err) {
        next(err);
      }
    }
  );
  res.status(201).json('monster have been received');
  delete monsters[param.name];
  monsters[monster.slug] = monster;
});

// DELETE

app.delete('/monster/:slug', function (req, res, next) {
  const param = req.params;
  db.run(
    'delete from monsters where slug = $slug',
    {
      $slug: param.slug,
    },
    (err) => {
      if (err) {
        next(err);
      } else {
        res.sendStatus(204);
      }
    }
  );
});

app.use(errorHandler);

app.listen(8080, () => console.log(`Little server is listening`));
