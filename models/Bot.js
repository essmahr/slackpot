var mongoose = require('mongoose');

var botSchema = mongoose.Schema({
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  frequency: {
    type: Number,
    required: true
  },
  businessDays: Boolean,
  accessToken: String,
  channel: String
});

module.exports = mongoose.model('Bot', botSchema);
