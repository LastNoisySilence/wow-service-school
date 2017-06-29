let passport = require('passport');

function verifyAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401);
    return res.end('Please Login.');
  }
  next();
}

module.exports = verifyAuth;