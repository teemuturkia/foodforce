'use strict';

var app = angular.module('lunch-force', [
  'ngResource',
  'ngCookies',
  'ui.bootstrap'
]);

app.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);