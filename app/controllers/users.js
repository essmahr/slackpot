'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.signin = function () {};

exports.authAndLogin = function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({
    SlackId: profile.id,
  }, {
    displayName: profile.displayName,
    accessToken,
  },
  (err, user) => {
    return done(err, user);
  });
};


/**
 * Auth callback
 */

exports.authCallback = login;


/**
 * Login
 */

function login (req, res) {
  const redirectTo = req.session.returnTo
    ? req.session.returnTo
    : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
}
