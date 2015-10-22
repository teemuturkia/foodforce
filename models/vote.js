'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VoteSchema = new Schema({
  id: String,
  name: String,
  menu: String
});

module.exports = mongoose.model('Vote', VoteSchema);
