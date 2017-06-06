let mongoose = require('mongoose');

let eventSchema = mongoose.Schema({
  title: String,
  categoryId: String,
  trainerId: String,
  imagePath: String,
  type: String,
  date: Date,
  duration: String,
  cost: String,
  place: String,
  audience: String,
  goal: String,
  schedule: String,
  additionalInfo: String
});

let Event = mongoose.model('Event', eventSchema);

module.exports = Event;