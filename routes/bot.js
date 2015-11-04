var express = require('express');
var Account = require('../models/Account');
var Bot = require('../models/Bot');
var Channel = require('../models/Channel');
var router = express.Router();
var isAuthenticated = require('../isAuthenticated');

router.get('/', isAuthenticated, function (req, res) {
  res.redirect('/');
});

router.get('/new', isAuthenticated, function (req, res) {
  Bot.find({_owner: req.user.id}, function(err, bots) {
    // only allow new bot if user hasn't any
    if (bots.length) {
      res.redirect('/')
    } else {
      res.render('bots/new');
    }
  });
});

// new bot!
router.post('/new', isAuthenticated, function (req, res, next) {
  var channelId = new Channel(req.user.accessToken)
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

  bot.save(function(err, bot) {
    if (err) { req.flash('error', err.message); }
    Account.findById(req.user._id, function(err, account) {
      if (err) { req.flash('error', err.message); }
      account.bots.push(bot.id),
      account.save(function(err) {
        if (err) { req.flash('error', err.message); }
        // http://stackoverflow.com/questions/24493243/update-logged-in-user-details-in-session
        req.login(account, function(err) {
          if (err) { req.flash('error', err.message); }
          res.redirect('/');
        });
      })
    });
  });
});

router.get('/edit/:id', isAuthenticated, function (req, res) {
  Bot.findOne({_id: req.params.id}, function(err, bot) {
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
