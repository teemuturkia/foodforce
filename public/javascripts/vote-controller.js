'use strict';

angular.module('lunch-force').controller('VoteCtrl', function($scope, Restaurant) {
  $scope.restaurants = Restaurant.query();

  $scope.pointsLeft = 6;

  $scope.getRestaurantPoints = function() {
    return new Array(4);
  };

  $scope.getPointsLeft = function() {
    return new Array($scope.pointsLeft);
  }

});