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
  channel: String
});

Bot = mongoose.model('Bot', botSchema);

Bot.schema.path('_owner').validate(function (value, respond) {
  Bot.findOne({ _owner: value }, function (err, bot) {
    if(bot) {
      respond(false);
    } else {
      respond(true);
    }
  });
}, 'Only one Bot per account please');

module.exports = Bot;
