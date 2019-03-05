const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KEYS = require('../config');
const controller = require('../controller');

module.exports = db => {
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });
  passport.deserializeUser((id, done) => {
    controller
      .get(
        {
          path: {
            section: 'user',
            id_clause: `user_id=${id}`,
          },
        },
        null,
        db
      )
      .then(res => {
        done(null, { user: res.data[0] });
      })
      .catch(err => {
        console.log('Deserialize GET ERROR: ', err);
        done(null, err);
      });
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: KEYS.GOOGLE_CLIENT_ID,
        clientSecret: KEYS.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        proxy: true,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log('profile: ', profile);

        controller
          .get(
            {
              path: {
                section: 'user',
                id_clause: `google_id=${profile.id}`,
              },
            },
            null,
            db
          )
          .then(res => {
            console.log('passport auth res', res);
            if (res.data && res.data.length > 0) {
              // User exists
              done(null, res.data[0]);
            } else {
              // User does NOT exist
              controller
                .save(
                  {
                    path: {
                      section: 'user',
                    },
                    body: {
                      first_name: profile.name.givenName,
                      last_name: profile.name.familyName,
                      email: profile.emails[0].value,
                      profile_pic: profile.image ? profile.image.url : '',
                      google_id: profile.id,
                    },
                  },
                  null,
                  db
                )
                .then(res => {
                  done(null, { user_id: res.data.insertId });
                })
                .catch(err => {
                  console.log('ERROR: ', err);
                  done(null, { err: err });
                });
            }
          })
          .catch(err => {
            console.log('ERROR: ', err);
            done(null, { err: err });
          });
      }
    )
  );
};
