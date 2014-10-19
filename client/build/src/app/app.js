angular.module('foundation', [
  'ui.router',
  'templates-app',
  'templates-common',
  'foundation.home'
])

.config(function myAppConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
})

.constant('appConst', {
  appTitle: 'Foundation'
})

.run(function run() {
})

// ancestor scope
.controller('AppController', function AppController($scope, $location, appConst) {
  $scope.pageTitle = $scope.appTitle = appConst.appTitle;

  $scope.$on('title:update', function(e, title) {
    $scope.pageTitle = appConst.appTitle + (title ? ' - ' + title : '');
  });

})

;

