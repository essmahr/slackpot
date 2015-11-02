var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

var accountSchema = mongoose.Schema({
  SlackId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true
  },
  bots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bot'}]
});

accountSchema.plugin(findOrCreate);

module.exports = mongoose.model('Account', accountSchema);
