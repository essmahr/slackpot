var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var botSchema = new Schema({
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
  channel: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  businessDays: Boolean
});

botSchema.statics.findByUser = function(userId, cb) {
  return this.findOne({_owner: userId}, cb);
}

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
