let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let trainers = require('./routes/trainers'),
    news = require('./routes/news'),
    events = require('./routes/events'),
    eventsCategory = require('./routes/eventsCategory'),
    upload = require('./routes/upload'),
    subscription = require('./routes/subscription');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wow-service-school-v2');
app.use('/', express.static(path.join(__dirname + '/../wow-site/dist')));
app.use('/edit', express.static(path.join(__dirname + '/../wow-admin-panel/dist')));
app.use('/images', express.static(path.join(__dirname + '/static/images')));
app.use('/static', express.static(path.join(__dirname + '/static/default')));
app.use('/', trainers);
app.use('/', news);
app.use('/', events);
app.use('/', eventsCategory);
app.use('/', upload);
app.use('/', subscription);

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.use(function(req, res, next) {
  let err = new Error(res.body);
  err.status = 404;
  next(err);
});

module.exports = app;
