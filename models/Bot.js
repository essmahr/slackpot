var mongoose = require('mongoose');

var botSchema = mongoose.Schema({
  accessToken: String,
  frequency: Number,
  businessDays: Boolean,
  channel: String
});

module.exports = mongoose.model('Bot', settingsSchema);
