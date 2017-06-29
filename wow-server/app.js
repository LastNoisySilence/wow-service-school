let express = require('express');
let compression = require('compression')
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let passport = require('passport');
let mongoose = require('mongoose');
let LocalStrategy = require('passport-local').Strategy;
let User = require('./models/user');

let trainers = require('./routes/trainers'),
  users = require('./routes/user'),
  news = require('./routes/news'),
  events = require('./routes/events'),
  consultings = require('./routes/consultings'),
  eventsCategory = require('./routes/eventsCategory'),
  consultingsCategory = require('./routes/consultingsCategory'),
  upload = require('./routes/upload'),
  subscription = require('./routes/subscription');

let app = express();
app.use(compression());
mongoose.connect('mongodb://localhost:27017/wow-service-school-prod');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('cat on rails'));
app.use(session({ secret: 'cat on rails' }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use('/', express.static(path.join(__dirname + '/../wow-site/dist')));
app.use('/edit', express.static(path.join(__dirname + '/../wow-admin-panel/dist')));
app.use('/images', express.static(path.join(__dirname + '/static/images')));
app.use('/static', express.static(path.join(__dirname + '/static/default')));
app.use('/', trainers);
app.use('/', users);
app.use('/', news);
app.use('/', events);
app.use('/', consultings);
app.use('/', eventsCategory);
app.use('/', consultingsCategory);
app.use('/', upload);
app.use('/', subscription);

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.use(function (req, res, next) {
  let err = new Error(res.body);
  err.status = 404;
  next(err);
});

module.exports = app;
