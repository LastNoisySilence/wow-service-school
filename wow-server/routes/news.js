let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let db = mongoose.connection;
mongoose.Promise = global.Promise;

let News = require('../models/news');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  router.get('/news', function(req, res) {
    News.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });

  router.post('/news', function (req, res, next) {
    let obj = new News(req.body);
    obj.save(function (err, obj) {
      if (err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  router.put('/news/:id', function(req, res) {
    News.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

  router.delete('/news/:id', function(req, res) {
    News.findOne({_id: req.params.id}, function(err,obj) {
      try {
      fs.unlinkSync(__dirname + '/../static' + obj.imagePath);
      } catch (e) {}
    });
    News.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });
});
module.exports = router;
