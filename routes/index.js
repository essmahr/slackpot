var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var User = require('../models/User');

var slackbot = require('../lib/slackpot');
var bot = new slackbot();

router.get('/', function(req, res, next) {
  res.render('index');
});


module.exports = router;
