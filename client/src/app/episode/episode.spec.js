/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe('episode', function() {
  var service;
  var $httpBackend;

  // some test data
  var dummyEpisodes = [
    {"number": 2, "title":"Test 2"},
    {"number": 1, "title":"Test 1"}
  ];

  beforeEach(module('foundation.episode'));

  beforeEach(inject( function(_EpisodeService_, _$httpBackend_) {
    service = _EpisodeService_;
    $httpBackend = _$httpBackend_;

    $httpBackend.whenGET('/api/episode').respond(dummyEpisodes);
  }));

  it('should exist', inject(function() {
    expect(service).toBeTruthy();
  }));

  it('should request for episode data and cache them', inject(function() {
    $httpBackend.expectGET('/api/episode');

    service.list().then(
      function success(episodes) {
        expect(episodes.length).toEqual(dummyEpisodes.length);
        expect(service._cache.length).toEqual(dummyEpisodes.length);
      },
      function error() {
        expect('Reset failed').toBeFalsy();
      }
    );

    $httpBackend.flush();
  }));

  it('should get episode data from the cache after first request', inject(function() {
    // simulate
    service._cache = dummyEpisodes;

    service.list().then(
      function success(episodes) {
        expect(episodes.length).toEqual(service._cache.length);
      },
      function error() {
        expect('Reset failed').toBeFalsy();
      }
    );
  }));

});

