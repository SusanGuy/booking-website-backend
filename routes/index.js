module.exports = reqParams => {
  return {
    main: require('./main')(reqParams),
    auth: require('./auth')(reqParams),
    user: require('./user')(reqParams),
    area_picture: require('./area_picture')(reqParams),
    area: require('./area')(reqParams),
    discussion: require('./discussion')(reqParams),
    places: require('./places')(reqParams),
    badge: require('./badge')(reqParams),
    forum: require('./forum')(reqParams),
    invoice: require('./invoice')(reqParams),
    news_internal: require('./news_internal')(reqParams),
    payment: require('./payment')(reqParams),
    rate: require('./rate')(reqParams),
    story: require('./story')(reqParams),
    thread: require('./thread')(reqParams),
    user_attribute: require('./user_attribute')(reqParams),
    user_review: require('./user_review')(reqParams),
    area_review_pic: require('./area_review_pic')(reqParams),
    area_review: require('./area_review')(reqParams),
    award: require('./award')(reqParams),
  };
};
