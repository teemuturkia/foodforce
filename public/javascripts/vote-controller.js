'use strict';

angular.module('lunch-force').controller('VoteCtrl', function(
  $scope,
  $cookies,
  $http,
  $window,
  $timeout,
  Restaurant) {

  var maxPoints = 10;
  $scope.pointsLeft = maxPoints;

  var updateMaximums = function() {
    $scope.restaurants.forEach(function(restaurant) {
      restaurant.max = getMax(restaurant);
    });
  };

  var getMax = function(restaurant) {
    return (restaurant.points || 0) + $scope.pointsLeft;
  };

  var reloadPage = function() {
    if(!$cookies.get('vote')) {
      alert('Sivun käyttäminen vaatii evästeiden (tsihihi) hyväksymistä');
      return;
    }
    $window.location.reload();
  };

  $scope.user = {
    name: null,
    tempName: ''
  };

  $scope.saveName = function() {
    $scope.user.name = $scope.user.tempName;
  };

  $scope.render = true;

  $scope.restaurants = Restaurant.query(function() {
    updateMaximums();
    $scope.restaurants.forEach(function(restaurant) {
      restaurant.sort = parseInt(Math.random() * 1000);
    });
  });

  $scope.updatePoints = function() {
    $scope.pointsLeft = maxPoints;
    $scope.restaurants.forEach(function(restaurant) {
      $scope.pointsLeft -= (restaurant.points || 0);
    });
    $scope.render = false;
    updateMaximums();
    $timeout(function() {
      $scope.render = true;
    });
  };

  $scope.vote = function() {
    var result = {
      name: $scope.user.name,
      points: []
    };
    $scope.restaurants.forEach(function(restaurant) {
      if(restaurant.points && restaurant.points > 0) {
        result.points.push({
          restaurant: restaurant._id,
          points: restaurant.points
        });
      }
    });
    $http.post('/api/vote', result).then(function(response) {
      reloadPage();
    });
  };

});