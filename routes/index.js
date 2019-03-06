module.exports = (app, db) => {
  return {
    main: require('./main')(app),
    auth: require('./auth')(app, db),
    user: require('./user')(app, db),
    area_picture: require('./area_picture')(app, db),
    area: require('./area')(app, db),
    discussion: require('./discussion')(app, db),
    places: require('./places')(app),
    badge: require('./badge')(app, db),
    forum: require('./forum')(app, db),
    invoice: require('./invoice')(app, db),
    news_internal: require('./news_internal')(app, db),
    payment: require('./payment')(app, db),
    rate: require('./rate')(app, db),
    story: require('./story')(app, db),
    thread: require('./thread')(app, db),
    user_attribute: require('./user_attribute')(app, db),
    user_review: require('./user_review')(app, db),
    area_review_pic: require('./area_review_pic')(app, db),
    area_review: require('./area_review')(app, db),
    award: require('./award')(app, db),
  };
};
