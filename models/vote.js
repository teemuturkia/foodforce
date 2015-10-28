'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VoteSchema = new Schema({
  id: String,
  name: String,
  points: [{
    restaurant: {
      type: String,
      ref: 'Restaurant'
    },
    points: Number
  }],
  date: String
});

module.exports = mongoose.model('Vote', VoteSchema);
