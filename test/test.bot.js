var should = require("should");
var mongoose = require('mongoose');
var Account = require("../models/Account");
var Bot = require("../models/Bot");
var db;

describe('Bot', function() {

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
      username: '12345',
      password: 'testy'
    });

    var bot = new Bot({
      _owner: '123456',
      title: 'testbot',
      accessToken: 'test token',
      frequency: 2,
      businessDays: false,
      channel: 'test channel'
    });

    account.save(function(err, acount) {
      if (err) {
        console.log('account creation error: ' + error.message);
      } else {
        console.log('account created');

        var bot = new Bot({
          _owner: account.id,
          title: 'testbot',
          accessToken: 'test token',
          frequency: 2,
          businessDays: false,
          channel: 'test channel'
        });

        bot.save(function(err) {
          if (err) {
            console.log('bot creation error: ' + err.message);
          } else {
            console.log('bot account created');
            done();
          }
        });
      }
    });
  });

  it('lists bots by user', function(done) {
    Account.findOne({ username: '12345' }, function(err, account) {
      account.username.should.eql('12345');
      Bot.find({_owner: account.id}, function(err, bots) {
        bots.should.have.length(1);
        bots[0].title.should.eql('testbot');
        done();
      });
    });
  });

  afterEach(function(done) {
    Account.remove({}, function() {
      done();
    });
  });

});
