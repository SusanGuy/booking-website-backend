const handleApiResults = (err, results, res, section, resolve, reject) => {
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
    if (res) {
      return res.json(apiResult);
    } else {
      return reject(apiResult);
    }
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

  if (res) {
    return res.json(apiResult);
  } else {
    return resolve(apiResult);
  }
};

module.exports = {
  getAll: (params, res, db) => {
    let section = params.path.section;

    db.query(`SELECT * FROM ${section}`, (err, results) =>
      handleApiResults(err, results, res, section)
    );
  },
  get: (params, res, db) => {
    return new Promise((resolve, reject) => {
      let section = params.path.section;
      let id_clause = params.path.id_clause;

      db.query(`SELECT * FROM ${section} WHERE ${id_clause}`, (err, results) =>
        handleApiResults(err, results, res, section, resolve, reject)
      );
    });
  },
  delete: (params, res, db) => {
    let section = params.path.section;
    let id_clause = params.path.id_clause;

    db.query(
      `DELETE FROM ${section} WHERE ${section + '_' + id_clause}`,
      (err, results) => handleApiResults(err, results, res, section)
    );
  },
  save: (params, res, db) => {
    return new Promise((resolve, reject) => {
      let section = params.path.section;
      let body = params.body;

      let joinedFields = Object.keys(body).join(', ');
      let joinedValues = "'" + Object.values(body).join("','") + "'";
      console.log('Values are ', joinedValues);

      db.query(
        `INSERT INTO ${section}(${joinedFields}) VALUES(${joinedValues})`,
        (err, results) =>
          handleApiResults(err, results, res, section, resolve, reject)
      );
    });
  },
  update: (params, res, db) => {
    let section = params.path.section;
    let id_clause = params.path.id_clause;
    let body = params.body;

    let columns = Object.keys(body);
    let statements = [];
    columns.map(column => {
      let statement = `${column} = '${body[column]}'`;
      statements.push(statement);
    });

    db.query(
      `UPDATE ${section} SET ${statements.join(', ')} WHERE ${section +
        '_' +
        id_clause}`,
      (err, results) => handleApiResults(err, results, res, section)
    );
  },
};
