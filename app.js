'use strict';

require('dotenv').load();

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var SlackStrategy = require('passport-slack').Strategy;
var cookieSession = require('cookie-session');
var flash = require('express-flash');
// var favicon = require('serve-favicon');

var routes = require('./routes/index');
var bots = require('./routes/bot');
var channel = require('./routes/channel');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// auth setup
app.set('trust proxy', 1); // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// passport config
var Account = require('./models/Account');
passport.use(new SlackStrategy({
    clientID: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    scope: ['channels:read', 'users:read', 'chat:write:bot'],
    callbackURL: '/auth/slack/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    Account.findOrCreate({
      SlackId: profile.id,
    }, {
      displayName: profile.displayName,
      accessToken: accessToken
    },
    function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// attach user var to every request
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

// set up routes
app.use('/', routes);
app.use('/bots', bots);
app.use('/channels', channel);


mongoose.connect(process.env.MONGOLAB_URI || process.env.LOCAL_DB_URI, function(err) {
  if (err) console.log('connection error', err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var port = process.env.PORT;

app.listen(port);

console.log("Listening on port " + port);
