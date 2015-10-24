'use strict';

angular.module('lunch-force').controller('VotedCtrl', function($timeout, $window) {

  var checkTime = function() {
    var now = new Date();
    var currentHour = now.getHours();
    var currentMinutes = now.getMinutes();
    if(currentHour < 10 || (currentHour == 10 && currentMinutes <= 45)) {
      console.log('checking', now);
      $timeout(checkTime, 10000);
    } else {
      console.log('reloading');
      $window.location.reload();
    }
  };

  checkTime();

});