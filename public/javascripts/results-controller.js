'use strict';

angular.module('lunch-force').controller('ResultsCtrl', function($scope, $http) {

  $http.get('/api/results').then(function(results) {
    $scope.results = results.data;
  });

});