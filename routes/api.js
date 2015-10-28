var express = require('express');
var moment = require('moment');
var router = express.Router();
var _ = require('underscore');
var Restaurant = require('../models/restaurant');
var Vote = require('../models/vote');
var parser = require('../util/ruokapaikka.fi.parser');

var findRestaurants = function(req, res) {
  var date = moment();
  var today = date.format('D.M.');
  Restaurant.find({date: { $eq: today }}, function(err, restaurants) {
    if(restaurants.length > 0) {
      res.json(restaurants);
    } else {
      parser.parse().then(function() {
        findRestaurants(req, res);
      });
    }
  });
};

router.get('/restaurant', function(req, res) {
  findRestaurants(req, res);
});

router.get('/results', function(req, res) {
  var date = moment();
  var today = date.format('D.M.');
  var results = [];
  Vote.find({date: { $eq: today }}).populate('points.restaurant').exec(function(err, votes) {
    if(err) {
      return res.send(500, err);
    }
    votes.forEach(function(vote) {
      vote.points.forEach(function(points) {
        var existing = _.find(results, function(result) {
          return result.id === points.restaurant._id;
        });
        if(existing) {
          existing.totalPoints += points.points;
          existing.points.push({
            name: vote.name,
            points: points.points
          });
        } else {
          results.push({
            id: points.restaurant._id,
            name: points.restaurant.name,
            menu: points.restaurant.menu,
            totalPoints: points.points,
            points: [{
              name: vote.name,
              points: points.points
            }]
          });
        }
      });
    });
    res.json(_.sortBy(results, function(result) {
      return -result.totalPoints;
    }));
  });
});

router.post('/vote', function(req, res) {
  var date = moment();
  var today = date.format('D.M.');
  reg.body.date = today;
  Vote.create(req.body, function(err) {
    if(err) {
      return res.send(500, err);
    }
    res.cookie('vote', true, {
      'maxAge': 36000000
    });
    res.status(204).send();
  });
});

module.exports = router;
