var http = require('http'),
    mongoose = require('mongoose'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    config = require('../config'),
    Q = require('q'),
    Restaurant = require('../models/restaurant'),
    Vote = require('../models/vote');

function parseContent(content) {
  var $ = cheerio.load(content, {
    normalizeWhitespace: true
  });
  $('.linkkipalkki_mobi').remove();
  $('.alamenu').remove();
  var html = $('.tekstit_rs').html();
  var title = html.substring(html.indexOf('</a> - ') + 7, html.indexOf('<p>')).trim();
  var date = moment();
  var today = date.format('D.M.');
  var startIndex = html.indexOf(today) + 10;
  var endIndex = html.indexOf('</p>', startIndex);
  var menu = html.substring(startIndex, endIndex);
  if(menu.indexOf('<br>') === 0) {
    menu = menu.substr(4);
  }
  return saveRestaurant(title, menu);
}

function loadUrl(url) {
  var deferred = Q.defer();
  var req = http.request({
    hostname: 'ruokapaikka.fi',
    path: '/' + url
  }, function(res) {
    res.setEncoding('utf8');
    var data = '';
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function() {
      parseContent(data).then(function() {
        deferred.resolve();
      });
    });
  });

  req.end();
  return deferred.promise;
}

function saveRestaurant(title, menu) {
  return Restaurant.create({
    name: title,
    menu: menu || 'Ei ruokalistaa'
  });
}

function addRestaurants() {
  var urls = config.restaurants.urls;

  var promises = [];
  urls.forEach(function(url) {
    promises.push(loadUrl(url));
  });

  var staticRestaurants = config.restaurants.static;
  staticRestaurants.forEach(function(restaurant) {
    promises.push(saveRestaurant(restaurant));
  });

  Q.all(promises).then(function() {
    mongoose.disconnect();
  });
}

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/ruokapaikka';
mongoose.connect(mongoUri);

Vote.remove({}, function(err) {
  Restaurant.remove({}, function(err) {
    addRestaurants();
  });
});
