var express = require('express');
var router = express.Router();
var _ = require('underscore');
var Restaurant = require('../models/restaurant');
var Vote = require('../models/vote');

router.get('/restaurant', function(req, res) {
  Restaurant.find({}, function(err, restaurants) {
    res.json(restaurants);
  });
});

router.get('/results', function(req, res) {
  var results = [];
  Vote.find({}).populate('points.restaurant').exec(function(err, votes) {
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
