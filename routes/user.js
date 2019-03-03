const usersController = require('../controller');

module.exports = (app, db) => {
  app.get('/users', (req, res) => usersController.getAll(req, res, db));
  app.get('/users/:id', (req, res) => usersController.get(req, res, db));
  app.delete('/users/:id', (req, res) => usersController.delete(req, res, db));
  app.post('/users', (req, res) => usersController.add(req, res, db));
  app.put('/users/:id', (req, res) => usersController.update(req, res, db));
};
