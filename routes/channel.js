// express
var express = require('express');
var router = express.Router();

// models
var Bot = require('../models/Bot');
var Channel = require('../models/Channel');

// auth helper
var isAuthenticated = require('../isAuthenticated');


router.get('/', isAuthenticated, function (req, res) {
  Bot.findByUser(req.user._id, function(err, bot) {
    if (err) {
      res.send(err);
    } else {
      new Channel(req.user.accessToken)
        .list(function(response) {
          res.json(response);
        });
    }
  });
});


router.get('/:id', isAuthenticated, function (req, res) {
  var channelInfo = new Channel(req.user.accessToken).getInfo(req.params.id, function(channel) {
    res.json(channel);
  });
});


module.exports = router;
