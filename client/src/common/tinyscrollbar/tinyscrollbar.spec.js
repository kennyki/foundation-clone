describe('tinyscrollbar', function() {
  var scope;
  var $compile;

  var basic = 
    '<div tinyscrollbar>' + 
      '<img><img><img><img><img>' + 
    '</div>';
  var withOpts = 
    '<div tinyscrollbar="{axis: \'x\', thumbSize: 200}">' + 
      '<img><img><img><img><img>' + 
    '</div>';
  var withWatch = 
    '<div tinyscrollbar tinyscrollbar-watch="testData">' + 
      '<img ng-repeat="url in testData" ng-src="{{url}}">' + 
    '</div>';

  beforeEach(module('tinyscrollbar'));

  beforeEach(inject( function($rootScope, _$compile_) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  var createDirective = function createDirective(html) {
    var element = angular.element(html);

    $compile(element)(scope);

    scope.$digest();

    return element.find('.tinyscrollbar');
  };

  it('should have correct HTML structure', inject(function() {
    var element = createDirective(basic);
    
    expect(element.hasClass('tinyscrollbar')).toBeTruthy();
    expect(element.find('.scrollbar')).toBeTruthy();
    expect(element.find('.track')).toBeTruthy();
    expect(element.find('.thumb')).toBeTruthy();
    expect(element.find('.end')).toBeTruthy();
    expect(element.find('.viewport')).toBeTruthy();
    expect(element.find('.overview')).toBeTruthy();
    expect(element.find('img').length).toBe(5);
  }));

  it('should allow configurations', inject(function($timeout) {
    var element = createDirective(withOpts);
    
    // this is because the width is set asynchronously
    $timeout(function() {
      expect(element.find('.thumb').width()).toBe(200);
    }, 2000);
  }));

  it('should be able to watch a parent scope variable and update on change', inject(function($timeout) {
    // setup
    scope.testData = ['/images/first.png'];

    var element = createDirective(withWatch);
    
    $timeout(function() {
      expect(element.find('img').length).toBe(1);

      // add
      scope.testData.push('/images/second.png');
      scope.$digest();

      $timeout(function() {
        expect(element.find('img').length).toBe(2);
      }, 2000);

    }, 2000);
  }));

});