let express = require('express');
let router = express.Router();
let verifyAuth = require('../shared/verifyAuth');
let mongoose = require('mongoose');

let db = mongoose.connection;
mongoose.Promise = global.Promise;

let ConsultingCategory = require('../models/consultingCategory');
let Consulting = require('../models/consulting');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  router.get('/consultingsCategory', function (req, res) {
    ConsultingCategory.find({}, function (err, docs) {
      if (err) return console.error(err);
      res.json(docs);
    });
  });

  router.post('/consultingsCategory', verifyAuth, function (req, res, next) {
    let obj = new ConsultingCategory(req.body);
    obj.save(function (err, obj) {
      if (err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  router.put('/consultingsCategory/:id', verifyAuth, function (req, res) {
    ConsultingCategory.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
      if (err) return console.error(err);
      res.sendStatus(200);
    })
  });

  router.delete('/consultingsCategory/:id', verifyAuth, function (req, res) {
    ConsultingCategory.findOneAndRemove({_id: req.params.id}, function (err, deletedObject) {
      if (err) return console.error(err);
      ConsultingCategory.findOne({secondaryKey: 'other'}, (findError, findObject) => {
        if (findObject) {
          Consulting.update({categoryId: req.params.id}, {$set: {categoryId: findObject._id}}, {multi: true}, (err) => {
            if (err) return console.error(err);
          });
          findObject.listOfConsultingIds =
            findObject.listOfConsultingIds.concat(deletedObject.listOfConsultingIds);
          findObject.save((otherSavedError, otherSavedData) => {
            if (err) return console.error(otherSavedError);
          });
        } else {
          let other = new ConsultingCategory({
            title: 'Другие',
            listOfConsultingIds: [],
            secondaryKey: 'other'
          });
          other.listOfConsultingIds = deletedObject.listOfConsultingIds;
          other.save((otherSavedError, otherSavedData) => {
            if (err) return console.error(otherSavedError);
            Consulting.update({ categoryId: req.params.id }, { $set: { categoryId: otherSavedData._id } }, { multi: true }, (err) => {
              if (err) return console.error(err);
            });
          });
        }
      });
      res.sendStatus(200);
    });
  });
});
module.exports = router;
