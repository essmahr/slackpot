var express = require('express');
var Bot = require('../models/Bot');
var router = express.Router();
var isAuthenticated = require('../isAuthenticated');

router.get('/', isAuthenticated, function (req, res) {
  res.redirect('/');
});

router.get('/new', isAuthenticated, function (req, res) {
  if (req.user.bots.length) {
    res.redirect('/')
  } else {
    res.render('bots/new');
  }
});

router.post('/new', isAuthenticated, function (req, res) {

  var bot = new Bot({
    _owner: req.user.id,
    title: req.body.title,
    accessToken: req.body.accessToken,
    frequency: req.body.frequency,
    businessDays: req.body.businessDays,
    channel: req.body.channel
  });

  bot.save(function(err) {
    if (err)
      console.log(err);
      req.flash('error', err.message);
    res.redirect('/');
  });
});

router.get('/edit/:id', isAuthenticated, function (req, res) {
  Bot.findById(req.params.id, function(err, bot) {
    console.log(bot);
    if (err)
      res.send(err);
    res.render('bots/edit', {bot: bot});
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
    res.redirect('/');
  })
});

module.exports = router;
