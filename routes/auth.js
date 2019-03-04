const passport = require('passport');

module.exports = app => {
  /**
   * PASSPORT SETUP
   * This section we pass in the website's
   * configuration to Google OAuth 2.0 API (Google+ API).
   *
   * This is all done in "console.developers.google.com"
   *
   */
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  app.get('/auth/google/callback', passport.authenticate('google'));
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });
  app.get('/auth/current_user', (req, res) => {
    res.send(req.user);
  });
};
