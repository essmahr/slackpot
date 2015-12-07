'use strict';

const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

/**
 * User schema
 */

const UserSchema = new Schema({
  SlackId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  bots: [{ type: Schema.Types.ObjectId, ref: 'Bot'}],
});

UserSchema.plugin(findOrCreate);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

UserSchema.method({

});

/**
 * Statics
 */

UserSchema.static({

});

/**
 * Register
 */

mongoose.model('User', UserSchema);
