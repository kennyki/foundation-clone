angular.module('tinyscrollbar', [])

.directive('tinyscrollbar', function($timeout) {

  var directive = {

    restrict: 'A',

    template: '<div class="tinyscrollbar">' + 
                '<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>' + 
                '<div class="viewport"><div class="overview" ng-transclude></div></div>' + 
              '</div>',

    transclude: true,

    scope: {
      opts: '&tinyscrollbar'
    },

    link: function link(scope, element, attrs) {
      var opts = scope.opts && scope.opts();
      var scrollbar = tinyscrollbar(element[0], opts || {});

      if (attrs.tinyscrollbarWatch) {
        scope.$watch(attrs.tinyscrollbarWatch, function() {
          $timeout(function() {
            // deal with dynamic & live changes
            scrollbar.update();
          }, 3000); // TODO: this is a quick hack to deal with the delay of scrollWidth changes, gotta find better fix
        });
      }
    }

  };

  return directive;

})

;