angular.module('tinyscrollbar', [])
// TODO: test
.directive('tinyscrollbar', function($timeout) {

  var directive = {

    restrict: 'A',

    template: '<div class="tinyscrollbar">' + 
                '<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>' + 
                '<div class="viewport"><div class="overview" ng-transclude></div></div>' + 
              '</div>',

    transclude: true,

    scope: {
      opts: '&tinyscrollbar',
      watch: '@tinyscrollbarWatch'
    },

    link: function link(scope, element, attrs) {
      var scrollbar = tinyscrollbar(element[0], scope.opts() || {});

      if (scope.watch) {
        scope.$watch(scope.watch, function() {
          $timeout(function() {
            // deal with dynamic & live changes
            scrollbar.update();
          }, 100);
        });
      }
    }

  };

  return directive;

})

;