let express = require('express');
let router = express.Router();
let verifyAuth = require('../shared/verifyAuth');
let mongoose = require('mongoose');
let fs = require('fs');

let db = mongoose.connection;
mongoose.Promise = global.Promise;

let Trainer = require('../models/trainer');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  router.get('/trainers', function (req, res) {
    Trainer.find({}, function (err, docs) {
      if (err) return console.error(err);
      res.json(docs);
    });
  });

  router.post('/trainers', verifyAuth, function (req, res, next) {
    let obj = new Trainer(req.body);
    console.log('obj', obj);
    obj.save(function (err, obj) {
      if (err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  router.put('/trainers/:id', verifyAuth, function (req, res) {
    Trainer.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
      if (err) return console.error(err);
      res.sendStatus(200);
    })
  });

  router.delete('/trainers/:id', verifyAuth, function (req, res) {

    Trainer.findOne({_id: req.params.id}, function (err, obj) {
      try {
        fs.unlinkSync(__dirname + '/../static' + obj.photoUrl);
      } catch (e) {}
    });
    Trainer.findOneAndRemove({_id: req.params.id}, function (err) {
      if (err) return console.error(err);
      res.sendStatus(200);
    });
  });
});
module.exports = router;
