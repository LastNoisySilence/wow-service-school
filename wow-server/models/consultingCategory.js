let mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
  title: String,
  listOfConsultingIds: [String],
  secondaryKey: String
});

let ConsultingCategory = mongoose.model('ConsultingCategory', categorySchema);

module.exports = ConsultingCategory;