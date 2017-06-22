let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let db = mongoose.connection;
mongoose.Promise = global.Promise;

let ConsultingCategory = require('../models/consultingCategory');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  router.get('/consultingsCategory', function (req, res) {
    ConsultingCategory.find({}, function (err, docs) {
      if (err) return console.error(err);
      res.json(docs);
    });
  });

  router.post('/consultingsCategory', function (req, res, next) {
    let obj = new ConsultingCategory(req.body);
    obj.save(function (err, obj) {
      if (err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  router.put('/consultingsCategory/:id', function (req, res) {
    ConsultingCategory.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
      if (err) return console.error(err);
      res.sendStatus(200);
    })
  });

  router.delete('/consultingsCategory/:id', function (req, res) {
    ConsultingCategory.findOneAndRemove({_id: req.params.id}, function (err, deletedObject) {
      if (err) return console.error(err);
      ConsultingCategory.findOne({secondaryKey: 'other'}, (findError, findObject) => {
        if (findObject) {
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
          });
        }
      });
      res.sendStatus(200);
    });
  });
});
module.exports = router;
