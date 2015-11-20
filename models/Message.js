var _ = require('lodash');
var slackApi = require('../models/slackApi');

function message(token, bot) {
  this.bot = bot;
  this.slack = new slackApi(token);

  var messageData = {
    channel: bot.channel.id,
    text: 'sup {user}, it\'s your turn'
  };
}

message.prototype.send = function(cb) {
  var _this = this;
  var allUsersAsked = false;

  this.slack.getUsersByChannel(_this.bot.channel.id, function(users) {
    // get all users not in askedUsers array
    var unAskedUsers = _.difference(users, _this.bot.askedUsers);

    // if there are no users left to ask, grab the first user again
    var userId = (unAskedUsers.length === 0) ? users[0] : unAskedUsers[0];

    // pull the user so we may access their name
    _this.slack.getUserByID(userId, function(user) {

      // send the message
      _this.slack.sendMessage(messageData, function() {

        // are there no more users to be asked?
        var askedUsers = (unAskedUsers.length === 0)
          ? [] // if yes, empty the array
          : _this.bot.askedUsers; // otherwise keep the array

        // add the user we just asked
        askedUsers.push(userId);

        // save that sucker
        _this.bot.update({
          askedUsers: askedUsers
        }, function(err) {
          if (err) { console.log(err); }
          console.log('bot saved');
          cb();
        });
      })
    });
  });
}

module.exports = message;
