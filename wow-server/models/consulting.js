let mongoose = require('mongoose');

let consultingSchema = mongoose.Schema({
  title: String,
  categoryId: String,
  duration: String,
  result: String,
  cost: String,
  description: String
});

let Consulting = mongoose.model('Consulting', consultingSchema);

module.exports = Consulting;