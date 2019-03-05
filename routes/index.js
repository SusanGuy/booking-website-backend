module.exports = (app, connection) => {
  return {
    main: require('./main')(app),
    auth: require('./auth')(app),
    user: require('./user')(app, connection),
    area_picture: require('./area_picture')(app, connection),
    area: require('./area')(app, connection),
    discussion: require('./discussion')(app, connection),
    places: require('./places')(app),
    badge: require('./badge')(app, connection),
    forum: require('./forum')(app, connection),
    invoice: require('./invoice')(app, connection),
    news_internal: require('./news_internal')(app, connection),
    payment: require('./payment')(app, connection),
    rate: require('./rate')(app, connection),
    story: require('./story')(app, connection),
    thread: require('./thread')(app, connection),
    user_attribute: require('./user_attribute')(app, connection),
    user_review: require('./user_review')(app, connection),
    area_review_pic: require('./area_review_pic')(app, connection),
    area_review: require('./area_review')(app, connection),
    award: require('./award')(app, connection),
  };
};
