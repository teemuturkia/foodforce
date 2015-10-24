var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

router.get('/restaurant', function(req, res) {
  Restaurant.find({}, function(err, restaurants) {
    res.json(restaurants);
  });
});

router.post('/vote', function(req, res) {
  console.log('received', req.body);
  res.cookie('vote', true, {
    'maxAge': 36000000
  });
  res.status(204).send();
});

module.exports = router;
