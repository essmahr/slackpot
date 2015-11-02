// express
var express = require('express');
var router = express.Router();

// models
var Bot = require('../models/Bot');
var Channel = require('../models/Channel');

// auth helper
var isAuthenticated = require('../isAuthenticated');


router.get('/', isAuthenticated, function (req, res) {

  Bot.findByUser(req.user.id, function(err, bot) {
    if (err) {
      res.send(err);
    } else {
      new Channel(bot.accessToken)
        .list(function(response) {
          res.json(response);
        });
    }
  });
});


router.get('/:id', isAuthenticated, function (req, res) {
  var channelInfo = Channel.getInfo(req.params.id);
  res.json(channelInfo);
});


module.exports = router;
