var mongoose = require('mongoose');

var userSchema = new Schema({ name: String });

var channelSchema = mongoose.Schema({
  name: String,
  members: [userSchema]
});

module.exports = mongoose.model('Channel', channelSchema);
