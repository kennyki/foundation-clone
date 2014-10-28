/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe('home', function() {
  var $scope;
  var controller;

  // some test data
  var dummyEpisodes = [
    {"number": 2, "title":"Test 2"},
    {"number": 1, "title":"Test 1"}
  ];
  var testEpisodeNumber = '1';
  var stateParams = {
    episodeNumber: testEpisodeNumber
  };

  beforeEach(module('foundation.home'));

  beforeEach(inject( function($controller, $rootScope, $q, EpisodeService) {
    $scope = $rootScope.$new();

    // mock the return value
    EpisodeService.list = function() {
      var deferred = $q.defer();

      deferred.resolve(dummyEpisodes);

      return deferred.promise;
    };

    controller = $controller('HomeController', {$scope: $scope, $stateParams: stateParams, EpisodeService: EpisodeService});
  }));

  it('should exist', inject(function() {
    expect(controller).toBeTruthy();
  }));

  it('should update page title on reset', inject(function($timeout) {
    var titleUpdated = false;

    $scope.$on('title:update', function() {
      titleUpdated = true;
    });

    $scope.reset();

    $timeout(function() {
      expect(titleUpdated).toBeTruthy();
    }, 1000);
  }));

  it('should retrieve all episode on reset', inject(function() {
    var promise = $scope.reset();

    promise.then(
      function success() {
        expect($scope.episodes.length).toBe(dummyEpisodes.length);
      },
      function error() {
        expect('Reset failed').toBeFalsy();
      }
    );
  }));

  it('should retrieve current episode based on state parameter "episodeNumber"', inject(function() {
    var promise = $scope.reset();

    promise.then(
      function success() {
        var expectedNumber = Number(testEpisodeNumber);

        expect($scope.currentEpisodeNumber).toBe(expectedNumber);
        expect($scope.currentEpisode.number).toBe(expectedNumber);
      },
      function error() {
        expect('Reset failed').toBeFalsy();
      }
    );
  }));

  it('should retrieve the last episode when state parameter "episodeNumber" is invalid', inject(function() {
    // NaN
    stateParams.episodeNumber = 'abc';

    var promise = $scope.reset();

    promise.then(
      function success() {
        var lastEpisodeNumber = dummyEpisodes[0].number;

        expect($scope.currentEpisodeNumber).toBe(lastEpisodeNumber);
        expect($scope.currentEpisode.number).toBe(lastEpisodeNumber);
      },
      function error() {
        expect('Reset failed').toBeFalsy();
      }
    )['finally'](
      function() {
        // reset it
        stateParams.episodeNumber = testEpisodeNumber;
      }
    );
  }));

  it('should construct an episode title appropriately', inject(function() {
    var promise = $scope.reset();

    promise.then(
      function success() {
        var episodeTitle = $scope.getCurrentEpisodeTitle();
        var hasTitleAndNumber = episodeTitle.indexOf($scope.currentEpisode.number) != -1 &&
                                episodeTitle.indexOf($scope.currentEpisode.title) != -1;

        expect(hasTitleAndNumber).toBeTruthy();
      },
      function error() {
        expect('Reset failed').toBeFalsy();
      }
    );
  }));

  it('should construct episode title blocks appropriately', inject(function() {
    var promise = $scope.reset();

    promise.then(
      function success() {
        var episodeTitleBlocks = $scope.getCurrentEpisodeTitleBlocks();

        expect(episodeTitleBlocks.join('')).toEqual($scope.getCurrentEpisodeTitle());
      },
      function error() {
        expect('Reset failed').toBeFalsy();
      }
    );
  }));

  it('should provide function to trust external URL', inject(function() {
    var url = 'testUrl';

    expect($scope.trustUrl(url).$$unwrapTrustedValue()).toEqual(url);
  }));

  it('should be able to start a video play', inject(function() {
    $scope.play();

    expect($scope.startPlaying).toBeTruthy();
  }));

});

