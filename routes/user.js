module.exports = (app, connection) => {
  app.get('/user', function(request, response) {
    connection.query('SELECT * FROM Sample_User', function(error, results) {
      if (error) throw error;
      response.send(results);
    });
  });

  app.delete('/user/:ID', function(request, response) {
    connection.query(
      'DELETE FROM Sample_User where ID= ?',
      [request.params.ID],
      function(error, results) {
        if (error) throw error;
        response.send({ results: results });
      }
    );
  });

  app.post('/user', function(request, response) {
    connection.query(
      'INSERT INTO Sample_User(Name) VALUES(?)',
      [request.body.Name],
      function(error, results) {
        if (error) throw error;
        response.send({ result: 'success' });
      }
    );
  });

  app.put('/user', function(request, response) {
    connection.query(
      'UPDATE `Sample_User` SET `Name` = ? where `ID` = ?',
      [request.body.Name, request.body.ID],
      function(error, results) {
        if (error) throw error;
        response.send(results);
      }
    );
  });
};
