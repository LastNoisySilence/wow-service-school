let mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
  title: String,
  listOfEventsIds: [String],
  secondaryKey: String
});

let Category = mongoose.model('Category', categorySchema);

module.exports = Category;