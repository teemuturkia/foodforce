'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  id: String,
  name: String,
  menu: String
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
