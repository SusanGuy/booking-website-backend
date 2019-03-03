const handleApiResults = (err, results, res, section) => {
  if (err) {
    let apiResult = {};

    apiResult.meta = {
      table: section,
      type: 'collection',
      total: 0,
      message: err,
    };
    //create an empty data table
    apiResult.data = [];

    //send the results (apiResult) as JSON to Express (res)
    //Express uses res.json() to send JSON to client
    //you will see res.send() used for HTML
    res.json(apiResult);
  }

  let resultJson = JSON.stringify(results);
  resultJson = JSON.parse(resultJson);

  // create a meta table to help apps
  //do we have results? what section? etc
  let apiResult = {};
  apiResult.meta = {
    table: section,
    type: 'collection',
    total: 1,
    total_entries: 0,
  };

  //add our JSON results to the data table
  apiResult.data = resultJson;

  res.json(apiResult);
};

module.exports = {
  getAll: (req, res, db) => {
    let pathname = req._parsedUrl.pathname.split('/');
    let section = pathname[1];

    db.query(`SELECT * FROM ${section}`, (err, results) =>
      handleApiResults(err, results, res, section)
    );
  },
  get: (req, res, db) => {
    let pathname = req._parsedUrl.pathname.split('/');
    let section = pathname[1];
    let id = pathname[2];

    db.query(`SELECT * FROM ${section} WHERE user_id=${id}`, (err, results) =>
      handleApiResults(err, results, res, section)
    );
  },
  delete: (req, res, db) => {
    let pathname = req._parsedUrl.pathname.split('/');
    let section = pathname[1];
    let id = pathname[2];

    db.query(`DELETE FROM ${section} WHERE user_id=${id}`, (err, results) =>
      handleApiResults(err, results, res, section)
    );
  },
  add: (req, res, db) => {
    let pathname = req._parsedUrl.pathname.split('/');
    let section = pathname[1];
    let params = req.body;

    let joinedFields = Object.keys(params).join(', ');
    let joinedValues = "'" + Object.values(params).join("','") + "'";

    db.query(
      `INSERT INTO ${section}(${joinedFields}) VALUES(${joinedValues})`,
      (err, results) => handleApiResults(err, results, res, section)
    );
  },
  update: (req, res, db) => {
    let pathname = req._parsedUrl.pathname.split('/');
    let section = pathname[1];
    let id = pathname[2];
    let params = req.body;

    let columns = Object.keys(params);
    let statements = [];
    columns.map(column => {
      let statement = `${column} = '${params[column]}'`;
      statements.push(statement);
    });

    console.log('statements', statements);

    db.query(
      `UPDATE ${section} SET ${statements.join(', ')} WHERE user_id=${id}`,
      (err, results) => handleApiResults(err, results, res, section)
    );
  },
};
