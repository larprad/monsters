const express = require('express');
const path = require('path');
const api = express.Router({ mergeParams: true });
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('server/monsterDb.sqlite');

// GET

api.get('/allMonsters', function (req, res) {
  db.all('select * from monsters', (err, monsters) => {
    res.status(200).json(monsters);
  });
});

api.get('/monster/:slug', function (req, res) {
  const param = req.params;
  db.get('select * from monsters where slug = $slug', { $slug: param.slug }, (err, monster) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json(monster);
    }
  });
});

api.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// POST

api.post('/monster', function (req, res, next) {
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

api.put('/monster/:slug', function (req, res, next) {
  const monster = req.body;
  console.log(`req.body`);
  console.log(monster);
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

api.delete('/monster/:slug', function (req, res, next) {
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

module.exports = api;
