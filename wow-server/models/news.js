let mongoose = require('mongoose');

let newsSchema = mongoose.Schema({
  title: String,
  imagePath: String,
  description: String
});

let News = mongoose.model('News', newsSchema);

module.exports = News;