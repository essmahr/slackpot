'use strict';

const home = require('../app/controllers/home');
const users = require('../app/controllers/users');

/**
 * Expose
 */

module.exports = function (app, passport) {

  app.get('/', home.index);

  app.get('/auth/slack',
    passport.authenticate('slack')
  );

  app.get('/auth/slack/callback',
    passport.authenticate('slack', {
      failureRedirect: '/',
    }), users.authCallback);

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });


  /**
   * Error handling
   */

  app.use((err, req, res, next) => {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
      res.status(422).render('422', { error: err.stack });
      return;
    }

    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use((req, res) => {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found',
    });
  });
};
