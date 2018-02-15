myApp.controller('GameController', ['$http', '$location', 'GameService', function($http, $location, GameService) {
    console.log('GameController created');
    var self = this;

    self.distance = GameService.distance;

    self.submitGuess = function(){
        GameService.submitGuess();
    }
    delete GameService.marker;
    GameService.initMap();

}]);