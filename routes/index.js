var express = require('express');
var passport = require('passport');
var Account = require('../models/Account');
var Bot = require('../models/Bot');
var router = express.Router();

router.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    Bot.findOne({_owner: req.user._id}, function(err, bot) {
      if (err)
        res.send(err);
      if (bot) {
        res.render('bots/view', { bot: bot });
      } else {
        res.render('bots/new');
      }
    });
  } else {
    res.render('login');
  }
});

router.get('/auth/slack', passport.authenticate('slack'));

router.get('/auth/slack/callback', passport.authenticate('slack', {failureRedirect: '/login'}), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
