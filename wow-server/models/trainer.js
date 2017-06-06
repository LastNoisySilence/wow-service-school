let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let trainerSchema = new Schema({
  fullName: String,
  photoUrl: String,
  phoneNumber: String,
  email: String,
  siteUrl: String,
  description: String
});
let Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;