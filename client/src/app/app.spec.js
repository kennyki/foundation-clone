describe('app', function() {
  var AppController, $location, $scope;

  beforeEach(module('foundation'));

  beforeEach( inject( function( $controller, _$location_, $rootScope ) {
    $location = _$location_;
    $scope = $rootScope.$new();
    AppController = $controller('AppController', { $location: $location, $scope: $scope });
  }));

  it('should exist', inject( function() {
    expect(AppController).toBeTruthy();
  }));

  it('should have an app title', inject(function(appConst) {
    expect($scope.appTitle).toEqual(appConst.appTitle);
  }));

  it('should have an initial page title that matches the app title', inject(function(appConst) {
    expect($scope.pageTitle).toEqual(appConst.appTitle);
  }));

  it('should respond to title update from child scope', inject(function(appConst) {
    var $childScope = $scope.$new();
    var testTitle = 'test';

    $childScope.$emit('title:update', testTitle);

    expect($scope.pageTitle).toEqual(appConst.appTitle + ' - ' + testTitle);
  }));
});
