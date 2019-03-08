import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import passport from 'passport';
import KEYS from './config';
import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';

const PORT = process.env.PORT || 5000;

const app = express();

/************************
 * Winston Logger Setup *
 * Ref.: https://github.com/winstonjs/winston
 ************************/
const { combine, colorize, timestamp, label, prettyPrint } = format;
const logger = createLogger({
  format: combine(
    colorize(),
    label({
      label:
        process.env.NODE_ENV === 'development'
          ? 'heritage-dev'
          : 'heritage-prod',
    }),
    timestamp(),
    prettyPrint()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: 'info.log', level: 'info' }),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

logger.info(`Logger start for ${process.env.NODE_ENV}`);

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

/*********************
 * EXPRESS APP SETUP *
 *********************/
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    methods: 'GET, HEAD. PUT, PATCH, POST, DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token'],
  })
);
app.use(
  ///// Last 30 days before it expires (in Miliseconds)
  // 30 Days
  // 24 Hours
  // 60 Minutes (1 Hour)
  // 60 Seconds
  // 1000 Miliseconds
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [KEYS.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

/*****************************
 * DATABASE CONNECTION SETUP *
 *****************************/
const db = require('./services/database');
db.connect(function(err) {
  // If connection to DB returns error
  // then prevent server from starting
  if (err) {
    console.error('Error connecting:' + err.stack);
    return;
  }

  // OAUTH 2.0 SETUP
  require('./services/passport')(db);

  // ROUTES
  require('./routes')({ app, db, logger });

  // START THE SERVER
  app.listen(PORT, () => {
    console.log('Server start at Port: ' + PORT);
  });
});
