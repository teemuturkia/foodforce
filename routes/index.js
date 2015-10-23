var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

router.get('/', function(req, res) {
  res.render('vote');
});

module.exports = router;
