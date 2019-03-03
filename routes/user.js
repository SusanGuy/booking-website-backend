const controller = require('../controller');

const getParams = req => {
  let path = req._parsedUrl.pathname.split('/');
  return {
    path: {
      section: path[1],
      id_clause: `id=${path[2]}`,
    },
    body: req.body,
  };
};

module.exports = (app, db) => {
  app.get('/users', (req, res) => controller.getAll(getParams(req), res, db));
  app.get('/users/:id', (req, res) => controller.get(getParams(req), res, db));
  app.delete('/users/:id', (req, res) =>
    controller.delete(getParams(req), res, db)
  );
  app.post('/users', (req, res) => controller.save(getParams(req), res, db));
  app.put('/users/:id', (req, res) =>
    controller.update(getParams(req), res, db)
  );
};
