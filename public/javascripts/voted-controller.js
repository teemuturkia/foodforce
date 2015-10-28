'use strict';

angular.module('lunch-force').controller('VotedCtrl', function($timeout, $window) {

  var checkTime = function() {
    var now = new Date();
    var currentHour = now.getHours();
    if(currentHour < 11) {
      $timeout(checkTime, 10000);
    } else {
      $window.location.reload();
    }
  };

  $timeout(checkTime, 10000);

});