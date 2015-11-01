var mongoose = require('mongoose');

var botSchema = mongoose.Schema({
  _owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  title: String,
  accessToken: String,
  frequency: Number,
  businessDays: Boolean,
  channel: String
});

module.exports = mongoose.model('Bot', botSchema);
