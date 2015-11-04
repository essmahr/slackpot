var Slack = require('./slackApi');

function channel(token) {
  this.api = new Slack(token);
  return this;
}

channel.prototype.getInfo = function(channel, callback) {
  var params = {
    channel: channel
  };
  this.api.post('channels.info', params, function(response) {
    return callback(response);
  });
};

channel.prototype.list = function(callback) {
  var params = {
    exclude_archived: true,
  };
  this.api.post('channels.list', params, function(response) {
    return callback(response);
  });
};

channel.prototype.getId = function(name, callback) {
  this.list(function(response) {
    var channelId = false;
    response.channels.forEach(function(channel, index){
      if (channel.name === name) {
        channelId = channel.id;
      }
    });
    return callback(channelId);
  });
}

module.exports = channel;
