var express = require('express');
var slackbot = require('../lib/slackpot');
var token = require('../lib/slackToken');
var router = express.Router();

var bot = new slackbot(token);

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/post-message', function(req, res) {
  bot.sendMessage('#general', req.body.message);
  res.redirect('/');
});

module.exports = router;
