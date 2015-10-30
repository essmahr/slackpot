var mongoose = require('mongoose');

var botSchema = mongoose.Schema({
  title: String,
  accessToken: String,
  frequency: Number,
  businessDays: Boolean,
  channel: String
});

module.exports = mongoose.model('Bot', botSchema);
