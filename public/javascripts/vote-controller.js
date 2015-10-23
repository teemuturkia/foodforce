'use strict';

angular.module('lunch-force').controller('VoteCtrl', function($scope, $timeout, Restaurant) {

  var maxPoints = 10;
  var pointsLeft = maxPoints;

  var updateMaximums = function() {
    $scope.restaurants.forEach(function(restaurant) {
      restaurant.max = getMax(restaurant);
    });
  };

  var getMax = function(restaurant) {
    return (restaurant.points || 0) + pointsLeft;
  };

  $scope.render = true;

  $scope.restaurants = Restaurant.query(updateMaximums);

  $scope.updatePoints = function() {
    pointsLeft = maxPoints;
    $scope.restaurants.forEach(function(restaurant) {
      pointsLeft -= (restaurant.points || 0);
    });
    $scope.render = false;
    updateMaximums();
    $timeout(function() {
      $scope.render = true;
    });
  };

});