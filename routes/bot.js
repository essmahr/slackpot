var express = require('express');
var Bot = require('../models/Bot');
var router = express.Router();
var isAuthenticated = require('../isAuthenticated');

router.get('/', isAuthenticated, function (req, res) {
  Bot.find(function(err, bots) {
    if (err) { res.send(err) }
    console.log(bots);
    res.render('bots/index', {bots: bots});
  })
});

router.get('/new', isAuthenticated, function (req, res) {
  res.render('bots/new');
});

router.post('/new', isAuthenticated, function (req, res) {

  var bot = new Bot();

  bot.title = req.body.title;
  bot.accessToken = req.body.accessToken;
  bot.frequency = req.body.frequency;
  bot.businessDays = req.body.businessDays;
  bot.channel = req.body.channel;

  bot.save(function(err) {
    if (err)
      res.send(err);

    res.redirect('/bots');
  });
});

router.get('/edit/:id', isAuthenticated, function (req, res) {
  var bot = Bot.findById(req.params.id, function(err, bot) {
    if (err)
      res.send(err);
    res.render('bots/edit', {bot: bot});
  })
});

router.post('/new', isAuthenticated, function (req, res) {

  var bot = new Bot();

  bot.title = req.body.title;
  bot.accessToken = req.body.accessToken;
  bot.frequency = req.body.frequency;
  bot.businessDays = req.body.businessDays;
  bot.channel = req.body.channel;

  bot.save(function(err) {
    if (err)
      res.send(err);

    res.redirect('/bots');
  });
});

module.exports = router;
