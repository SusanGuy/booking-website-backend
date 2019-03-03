const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KEYS = require('../config');

passport.use(
  new GoogleStrategy(
    {
      clientID: KEYS.AUTH.GOOGLE_CLIENT_ID,
      clientSecret: KEYS.AUTH.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken: ', accessToken);
      console.log('refreshToken: ', refreshToken);
      console.log('profile: ', profile);
    }
  )
);
