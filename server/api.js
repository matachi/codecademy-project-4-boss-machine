const express = require('express');
const db = require('./db');

const apiRouter = express.Router();

apiRouter.param('minionId', (req, res, next, id) => {
  const minion = db.getFromDatabaseById('minions', id);
  if (!minion) {
    res.status(404).send();
  } else {
    req.minion = minion;
    next();
  }
});

apiRouter.get('/minions', (req, res, next) => {
  res.send(db.getAllFromDatabase('minions'));
});

apiRouter.post('/minions', (req, res, next) => {
  let minion = db.addToDatabase('minions', req.body);
  res.status(201).send(minion);
});

apiRouter.get('/minions/:minionId', (req, res, next) => {
  res.send(req.minion);
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
  let minion = db.updateInstanceInDatabase('minions', req.body);
  res.status(201).send(minion);
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
  db.deleteFromDatabasebyId('minions', req.minion.id);
  res.status(204).send();
});

module.exports = apiRouter;
