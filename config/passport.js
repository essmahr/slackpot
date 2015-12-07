'use strict';

const mongoose = require('mongoose');
const users = require('../app/controllers/users');
const SlackStrategy = require('passport-slack').Strategy;
const User = mongoose.model('User');

module.exports = (passport, config) => {
  // serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id },  (err, user) => {
      done(err, user);
    });
  });

  passport.use(new SlackStrategy({
    clientID: config.slackClientId,
    clientSecret: config.slackClientSecret,
    scope: ['channels:read', 'users:read', 'chat:write:bot'],
    callbackURL: '/auth/slack/callback',
  }, users.authAndLogin));
};

