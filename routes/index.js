var express = require('express');
var passport = require('passport');
var Account = require('../models/Account');
var Bot = require('../models/Bot');
var router = express.Router();

router.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    Bot.find({_owner: req.user.id}, function(err, bots) {
      if (err)
        res.send(err);
      res.render('bots/index', {
        account : req.user,
        bots: bots
      });
    });
  } else {
    res.render('index');
  }
});

router.get('/login', function(req, res) {
  res.render('login', { account : req.account });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', { account : account });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

module.exports = router;
