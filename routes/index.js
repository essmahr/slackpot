var env = require('../env');
var express = require('express');
var router = express.Router();
var slackbot = require('../lib/slackpot');

var bot = new slackbot(env.accessToken);

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/post-message', function(req, res) {
  bot.sendMessage('#general', req.body.message);
  res.redirect('/');
});

module.exports = router;
