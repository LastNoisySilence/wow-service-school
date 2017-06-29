let passport = require('passport');
let User = require('../models/user');
let router = require('express').Router();

router.post('/register', function (req, res, next) {
  User.register(new User({ username: req.body.username }), req.body.password, function (err) {
    if (err) {
      return next(err);
    }
    res.send(200);
  });
});

router.get('/login', function (req, res) {
  res.send(req.isAuthenticated() ? 200 : 401);
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  res.send(200);
});

router.get('/logout', function (req, res) {
  req.logout();
  res.send(200);
});

module.exports = router;