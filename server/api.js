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

apiRouter.param('ideaId', (req, res, next, id) => {
  const idea = db.getFromDatabaseById('ideas', id);
  if (!idea) {
    res.status(404).send();
  } else {
    req.idea = idea;
    next();
  }
});

apiRouter.get('/ideas', (req, res, next) => {
  res.send(db.getAllFromDatabase('ideas'));
});

apiRouter.post('/ideas', (req, res, next) => {
  let idea = db.addToDatabase('ideas', req.body);
  res.status(201).send(idea);
});

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
  let idea = db.updateInstanceInDatabase('ideas', req.body);
  res.status(201).send(idea);
});

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
  db.deleteFromDatabasebyId('ideas', req.idea.id);
  res.status(204).send();
});

module.exports = apiRouter;
