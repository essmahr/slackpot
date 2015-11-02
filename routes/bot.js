var express = require('express');
var Bot = require('../models/Bot');
var Channel = require('../models/Channel');
var router = express.Router();
var isAuthenticated = require('../isAuthenticated');

// redirect to home upon visiting /bots
router.get('/', isAuthenticated, function (req, res) {
  res.redirect('/');
});

// only allow new bot if user hasn't any
router.get('/new', isAuthenticated, function (req, res) {
  Bot.find({_owner: req.user.id}, function(err, bots) {
    if (bots.length) {
      res.redirect('/')
    } else {
      res.render('bots/new');
    }
  });
});

// new bot!
router.post('/new', isAuthenticated, function (req, res, next) {
  var channelId = new Channel(req.body.accessToken)
    .getId(req.body.channel);

  var bot = new Bot({
    _owner: req.user._id,
    title: req.body.title,
    frequency: req.body.frequency,
    businessDays: req.body.businessDays,
    channel: {
      name: req.body.channel,
      id: channelId
    }
  });

  bot.save(function(err) {
    if (err) {
      req.flash('error', err.message);
    }
    res.redirect('/');
  });
});

//
router.get('/edit/:id', isAuthenticated, function (req, res) {
  Bot.findOne({id: req.params.id}, function(err, bot) {
    if (err)
      res.send(err);
    if (bot) {
      res.render('bots/edit', {bot: bot});
    } else {
      res.status(400);
      res.render('error', {error: {}, message: 'that bot doesn\'t exist'});
    }
  })
});

router.post('/edit/:id', isAuthenticated, function (req, res) {
  Bot.findById(req.params.id, function(err, bot) {
    if (err)
      res.send(err);

    bot.update({
      title: req.body.title,
      accessToken: req.body.accessToken,
      frequency: req.body.frequency,
      businessDays: req.body.businessDays,
      channel: req.body.channel
    }, function(err) {
      if (err)
        console.log(err);
        req.flash('error', err);
      res.redirect('/');
    });
  });
});

router.get('/delete/:id', isAuthenticated, function (req, res) {
  Bot.remove({_id: req.params.id}, function(err, bot) {
    if (err)
      res.send(err);
    req.flash('info', 'Bot deleted.');
    res.redirect('/');
  })
});

module.exports = router;
