var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
