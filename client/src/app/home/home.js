angular.module('foundation.home', [
  'ui.router',
  'toaster',
  'ngProgressLite',
  'tinyscrollbar',
  'foundation.episode'
])

.config(function config($stateProvider) {
  $stateProvider.state('home', {
    url: '/:episodeNumber',
    views: {
      "main": {
        controller: 'HomeController',
        templateUrl: 'home/home.tpl.html'
      }
    }
  });
})

.controller('HomeController', function HomeController($scope, $sce, $stateParams, EpisodeService, toaster, ngProgressLite) {
  $scope.episodes = [];
  $scope.currentEpisode = null;
  $scope.currentEpisodeNumber = 0;
  $scope.startPlaying = false;

  /*
   * Reset necessary data
   */
  $scope.reset = function reset() {
    ngProgressLite.start();

    return EpisodeService.list().then(
      function success(episodes) {
        $scope.episodes = episodes;

        var currentEpisodeNumber = $scope.currentEpisodeNumber = Number($stateParams.episodeNumber);

        // episode number is in reverse order with the index
        // and select the last episode (index: 0) by default
        var index = currentEpisodeNumber ? episodes.length - currentEpisodeNumber : 0;

        $scope.currentEpisode = episodes[index];

        // update page title
        $scope.$emit('title:update', $scope.getCurrentEpisodeTitle());
      },
      function error(reason) {
        // only hide upon user clicks
        // TODO: i18n
        toaster.pop('error', 'Failed to load episode data', reason, 0);
      }
    )['finally'](function() {
      ngProgressLite.done();
    });
  };

  /*
   * Construct title as seen in the original site
   */
  $scope.getCurrentEpisodeTitle = function getCurrentEpisodeTitle() {
    return 'Episode ' + $scope.currentEpisode.number + ' w/ ' + $scope.currentEpisode.title;
  };

  /*
   * Split into 2 for display
   */
  $scope.getCurrentEpisodeTitleBlocks = function getCurrentEpisodeTitleBlocks() {
    var blocks = $scope.getCurrentEpisodeTitle().split('w/');

    // add it back
    blocks[0] += 'w/';

    return blocks;
  };

  /*
   * Have to do this
   */
  $scope.trustUrl = function trustUrl(url) {
    return $sce.trustAsResourceUrl(url);
  };

  /*
   * Play the selected episode
   */
  $scope.play = function play() {
    $scope.startPlaying = true;
  };

  $scope.reset();
})

;

