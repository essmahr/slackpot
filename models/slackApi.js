var https = require('https');
var querystring = require('querystring');

function slackApi(token) {
  this.token = token;
}

slackApi.prototype.post = function(method, params, cb) {
  var options, post_data, req;

  params['token'] = this.token;
  params['username'] = "slackpot";

  post_data = querystring.stringify(params);

  options = {
    hostname: 'slack.com',
    method: 'POST',
    path: '/api/' + method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': post_data.length
    }
  };

  req = https.request(options);

  req.on('response', function(res) {
    var buffer;
    buffer = '';

    res.on('data', function(chunk) {
      return buffer += chunk;
    });

    return res.on('end', function() {
      var value;
      if (cb != null) {
        if (res.statusCode === 200) {
          value = JSON.parse(buffer);
          return cb(value);
        } else {
          return cb({
            'ok': false,
            'error': 'API response: ' + res.statusCode
          });
        }
      }
    });
  });

  req.on('error', function(error) {
    if (cb != null) {
      return cb({
        'ok': false,
        'error': error.errno
      });
    }
  });

  req.write(post_data);
  return req.end();
};

module.exports = slackApi;
