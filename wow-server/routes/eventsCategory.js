let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let db = mongoose.connection;
mongoose.Promise = global.Promise;

let EventsCategory = require('../models/eventsCategory');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  router.get('/eventsCategory', function (req, res) {
    EventsCategory.find({}, function (err, docs) {
      if (err) return console.error(err);
      res.json(docs);
    });
  });

  router.post('/eventsCategory', function (req, res, next) {
    let obj = new EventsCategory(req.body);
    obj.save(function (err, obj) {
      if (err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  router.put('/eventsCategory/:id', function (req, res) {
    EventsCategory.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
      if (err) return console.error(err);
      res.sendStatus(200);
    })
  });

  router.delete('/eventsCategory/:id', function (req, res) {
    EventsCategory.findOneAndRemove({_id: req.params.id}, function (err, deletedObject) {
      if (err) return console.error(err);
      EventsCategory.findOne({secondaryKey: 'other'}, (findError, findObject) => {
        if (findObject) {
          findObject.listOfEventsIds =
            findObject.listOfEventsIds.concat(deletedObject.listOfEventsIds);
          findObject.save((otherSavedError, otherSavedData) => {
            if (err) return console.error(otherSavedError);
          });
        } else {
          let other = new EventsCategory({
            title: 'Другие',
            listOfEventsIds: [],
            secondaryKey: 'other'
          });
          other.listOfEventsIds = deletedObject.listOfEventsIds;
          other.save((otherSavedError, otherSavedData) => {
            if (err) return console.error(otherSavedError);
          });
        }
      });
      res.sendStatus(200);
    });
  });
});
module.exports = router;
