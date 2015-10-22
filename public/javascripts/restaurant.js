'use strict';

angular.module('lunch-force').factory('Restaurant', function ($resource) {
  return $resource('/api/restaurant');
});