angular.module('templates-app', ['home/home.tpl.html']);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div class='current-episode row'>\n" +
    "  <div class='col-md-8 col-md-offset-2 text-center'>\n" +
    "    <div ng-if='currentEpisode'>\n" +
    "      <div ng-if='startPlaying' class='embed-responsive embed-responsive-16by9'>\n" +
    "        <iframe class='embed-responsive-item' allowfullscreen ng-src='{{trustUrl(currentEpisode.youtube_url)}}'></iframe>\n" +
    "      </div>\n" +
    "      <a ng-if='!startPlaying' href ng-click='play()'>\n" +
    "        <img class='control' src='/app/assets/play.png'>\n" +
    "        <img class='preview' ng-src='/{{currentEpisode.image_url}}'>\n" +
    "      </a>\n" +
    "      <div class='caption text-left text-gray-light'>\n" +
    "        <h1 ng-init='titleBlocks = getCurrentEpisodeTitleBlocks()'>\n" +
    "          {{titleBlocks[0]}} <span class='highlight text-white'>{{titleBlocks[1]}}</span>\n" +
    "        </h1>\n" +
    "        <p>{{currentEpisode.description}}</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div ng-if='!currentEpisode'>\n" +
    "      <div class='dummy-episode'></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class='episodes' tinyscrollbar='{axis: \"x\", wheel: false}' tinyscrollbar-watch='episodes'>\n" +
    "  <div class='episode' ng-repeat='episode in episodes'>\n" +
    "    <a class='thumbnail' ng-class='{\"active\": currentEpisodeNumber == episode.number}' href ui-sref='home({episodeNumber: episode.number})'>\n" +
    "      <img ng-src='/{{episode.thubmnail_image_url}}'>\n" +
    "      <div class='episode-number text-white'>{{episode.number}}</div>\n" +
    "      <button class='btn btn-primary watch-btn'>Watch</button>\n" +
    "      <div class='caption'>\n" +
    "        <h4>{{episode.title}}</h4>\n" +
    "        <small class='text-muted'>{{episode.description}}</small>\n" +
    "      </div>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "</div>");
}]);
