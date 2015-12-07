'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const test = require('ava');
const request = require('supertest');
const app = require('../app');
const cleanup = require('./_helpers').cleanup;
const User = mongoose.model('User');

test.before(cleanup);
test.after(cleanup);

test('no tests yet', t => {
  t.pass();
});
