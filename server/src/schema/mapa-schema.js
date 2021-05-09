const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Tracking = new mongoose.Schema({
  tracking: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lon: {
    type: String,
    required: true,
  },
  plate: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

Tracking.plugin(uniqueValidator);
module.exports = mongoose.model('tracking', Tracking);
