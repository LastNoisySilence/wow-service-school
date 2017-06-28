let express = require('express');
let router = express.Router();
let verifyAuth = require('../shared/verifyAuth');
let mongoose = require('mongoose');
let db = mongoose.connection;
mongoose.Promise = global.Promise;

let Consulting = require('../models/consulting');
let ConsultingCategory = require('../models/consultingCategory');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  router.get('/consultings', function (req, res) {
    Consulting.find({}, function (err, docs) {
      if (err) return console.error(err);
      res.json(docs);
    });
  });

  router.post('/consultings', verifyAuth, function (req, res, next) {
    let obj = new Consulting(req.body);
    obj.save(function (err, obj) {
      if (err) return console.error(err);
      if (obj.categoryId) {
        ConsultingCategory.findOneAndUpdate(
          {_id: obj.categoryId},
          {$push: {listOfConsultingIds: obj._id}},
          function (err, obj) {
            if (err) return console.error(err);
          }
        );
      }
      res.status(200).json(obj);
    });
  });

  router.put('/consultings/:id', verifyAuth, function (req, res) {
    Consulting.findOne({_id: req.params.id}, function (err, consulting) {
      if (err) return console.error(err);
      Consulting.update({_id: req.params.id}, req.body, (consultingUpdateError) => {
        if (consultingUpdateError) return console.error(consultingUpdateError);
        if (req.body.categoryId !== consulting.categoryId) {
          ConsultingCategory.findOne({_id: req.body.categoryId}, (err, category) => {
            if (err) return console.error(err);
            category.listOfConsultingIds.push(req.body._id);
            category.save((categorySaveError) => {
              if (categorySaveError) return console.error(categorySaveError);
            });
          });
          ConsultingCategory.findOne({_id: consulting.categoryId}, (err, category) => {
            if (err) return console.error(err);
            category.listOfConsultingIds.splice(category.listOfConsultingIds.indexOf(req.params.id), 1);
            category.save((categorySaveError) => {
              if (categorySaveError) return console.error(categorySaveError);
            });
          });
        }
      });
      res.sendStatus(200);
    })
  });

  router.delete('/consultings/:id', verifyAuth, function (req, res) {
    ConsultingCategory.findOne({secondaryKey: 'other'}, (findError, findObject) => {
      if (findObject) {
        if (findObject.listOfConsultingIds.indexOf(req.params.id) > -1) {
          findObject.listOfConsultingIds.splice(findObject.listOfConsultingIds.indexOf(req.params.id), 1);
          findObject.save((otherSavedError, otherSavedData) => {
            if (otherSavedError) return console.error(otherSavedError);
          });
        }
      }
    });
    Consulting.findOneAndRemove({_id: req.params.id}, function (err, obj) {
      if (err) return console.error(err);
      if (obj && obj.categoryId) {
        ConsultingCategory.findOne(
          {_id: obj.categoryId},
          function (err, ecObj) {
            if (err) return console.error(err);
            if (ecObj && ecObj.listOfConsultingIds.indexOf(obj._id) > -1) {
              ecObj.listOfConsultingIds.splice(ecObj.listOfConsultingIds.indexOf(obj._id), 1);
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
