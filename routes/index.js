module.exports = (app, connection) => {
  return {
    main: require('./main')(app),
    user: require('./user')(app, connection),
  };
};
