var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var accountSchema = mongoose.Schema({
  username: String,
  password: String,
  bots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bot'}]
});

accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema);
