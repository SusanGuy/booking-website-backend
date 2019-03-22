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

module.exports = ({ app, db }) => {
  app.get('/paypal/amount/:amount/token/:token', (req, res) => {
    const { amount, token } = req.params;
    res.send(
      `<html><body>Payment amount: ${amount} for token: ${token}</body></html>`
    );
  });
  app.post('/paypal', (req, res) => {});
};
