var should = require("should");
var mongoose = require('mongoose');
var Account = require("../models/Account");
var db;

describe('User', function() {

  before(function(done) {
    db = mongoose.connect('mongodb://localhost/test');
    done();
  });

  after(function(done) {
    mongoose.connection.close();
    done();
  });

  beforeEach(function(done) {
    var account = new Account({
      SlackId: '12345',
      displayName: 'testy',
      accessToken: 'abcde'
    });

    account.save(function(error) {
      if (error) console.log('error' + error.message);
      else console.log('account created');
      done();
    });
  });

  it('finds a user by username', function(done) {
    Account.findOne({ displayName: 'testy' }, function(err, account) {
      account.displayName.should.eql('testy');
      done();
    });
  });

  afterEach(function(done) {
    Account.remove({}, function() {
      done();
    });
  });
});
