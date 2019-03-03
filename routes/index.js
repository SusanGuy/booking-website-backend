module.exports = (app, connection) => {
  return {
    main: require('./main')(app),
    auth: require('./auth')(app),
    user: require('./user')(app, connection),
  };
};
