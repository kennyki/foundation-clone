angular.module('foundation.episode', [])

.factory('EpisodeService', function($q, $http) {
  var service = {

    _cache: null,

    /*
     * Loads all episode from the server.
     *
     * @return Array
     */
    list: function list() {
      var self = this;

      if (self._cache && self._cache.length) {
        var deferred = $q.defer();
        deferred.resolve(self._cache);
        // we can serve cached list with current requirements
        return deferred.promise;
      }

      return $http.get('/api/episode').then(
        function success(response) {
          if (response.data && response.data.length) {
            // otherwise still make request the next time
            return self._cache = response.data;
          }

          return [];
        }
      );
    }

  };

  return service;
})

;