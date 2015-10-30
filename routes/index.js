var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index', { user : req.user });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
