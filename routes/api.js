var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

router.get('/restaurant', function(req, res) {
  Restaurant.find({}, function(err, restaurants) {
    res.json(restaurants);
  });
});

module.exports = router;
