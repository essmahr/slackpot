'use strict';

var env = require('./env');

var express = require('express');
var passport = require('passport');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var server = http.createServer(app);

var slackbot = require('./server/slackpot');

var bot = new slackbot(env.accessToken);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendfile('public/index.html');
});

app.post('/post-message', function(req, res) {
  bot.sendMessage('#general', req.body.message);
  res.redirect('/');
});

server.listen(3000, 'localhost');
server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
