let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let fs = require('fs');

let db = mongoose.connection;
mongoose.Promise = global.Promise;

let Event = require('../models/event');
let EventCategory = require('../models/eventsCategory');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  router.get('/events', function (req, res) {
    Event.find({}, function (err, docs) {
      if (err) return console.error(err);
      res.json(docs);
    });
  });

  router.post('/events', function (req, res, next) {
    let obj = new Event(req.body);
    obj.save(function (err, obj) {
      if (err) return console.error(err);
      if (obj.categoryId) {
        EventCategory.findOneAndUpdate(
          {_id: obj.categoryId},
          {$push: {listOfEventsIds: obj._id}},
          function (err, obj) {
            if (err) return console.error(err);
          }
        );
      }
      res.status(200).json(obj);
    });
  });

  router.put('/events/:id', function (req, res) {
    Event.findOne({_id: req.params.id}, function (err, event) {
      if (err) return console.error(err);
      Event.update({_id: req.params.id}, req.body, (eventUpdateError) => {
        if (eventUpdateError) return console.error(eventUpdateError);
        if (req.body.categoryId !== event.categoryId) {
          EventCategory.findOne({_id: req.body.categoryId}, (err, category) => {
            if (err) return console.error(err);
            category.listOfEventsIds.push(req.body._id);
            category.save((categorySaveError) => {
              if (categorySaveError) return console.error(categorySaveError);
            });
          });
          EventCategory.findOne({_id: event.categoryId}, (err, category) => {
            if (err) return console.error(err);
            category.listOfEventsIds.splice(category.listOfEventsIds.indexOf(req.params.id), 1);
            category.save((categorySaveError) => {
              if (categorySaveError) return console.error(categorySaveError);
            });
          });
        }
      });
      res.sendStatus(200);
    })
  });

  router.delete('/events/:id', function (req, res) {
    Event.findOne({_id: req.params.id}, function (err, obj) {
      try {
        fs.unlinkSync(__dirname + '/../static' + obj.imagePath);
      } catch (e) {
      }
    });
    EventCategory.findOne({secondaryKey: 'other'}, (findError, findObject) => {
      if (findObject) {
        if(findObject.listOfEventsIds.indexOf(req.params.id) > -1) {
          findObject.listOfEventsIds.splice(findObject.listOfEventsIds.indexOf(req.params.id), 1);
          findObject.save((otherSavedError, otherSavedData) => {
            if (otherSavedError) return console.error(otherSavedError);
          });
        }
      }
    });
    Event.findOneAndRemove({_id: req.params.id}, function (err, obj) {
      if (err) return console.error(err);
      if (obj && obj.categoryId) {
        EventCategory.findOne(
          {_id: obj.categoryId},
          function (err, ecObj) {
            if (err) return console.error(err);
            if (ecObj && ecObj.listOfEventsIds.indexOf(obj._id) > -1) {
              ecObj.listOfEventsIds.splice(ecObj.listOfEventsIds.indexOf(obj._id), 1);
              ecObj.save(function (error, object) {
                if (error) return console.error(error);
              });
            }
          }
        );
      }
      res.sendStatus(200);
    });
  });
});
module.exports = router;
