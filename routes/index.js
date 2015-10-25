var express = require('express');
var router = express.Router();
var moment = require('moment');
var Restaurant = require('../models/restaurant');

function renderVotePage(req, res) {
  if(!req.cookies.vote) {
    res.render('vote');
  } else {
    res.render('already-voted');
  }
}

function renderResultPage(req, res) {
  res.render('result');
}

router.get('/', function(req, res) {

  return renderResultPage(req, res);

  var now = moment();
  var currentHour = now.hour();
  var currentMinutes = now.minutes();
  if(currentHour < 10 || (currentHour == 10 && currentMinutes <= 45)) {
    renderVotePage(req, res);
  } else {
    renderResultPage(req, res);
  }

});

module.exports = router;
