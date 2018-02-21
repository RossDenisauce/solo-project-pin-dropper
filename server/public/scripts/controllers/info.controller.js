myApp.controller('InfoController', ['UserService', 'GameService', '$http', '$location', function (UserService, GameService, $http, $location) {
  console.log('InfoController created');
  var self = this;
  self.userService = UserService;

  self.getGameInfo = function () {
    $http.get(`/api/easy-mode/game-data/${UserService.userObject.id}`)
      .then((response) => {
        console.log('game get request success', response);
        self.data = response.data[0];
      })
      .catch((error) => {
        console.log('Error on get request', error);
      })
  }

  self.tryAnother = function(lat, lng, id, gameMode){
    GameService.tryAnother(lat, lng, id, gameMode);
    $location.path('/easy-mode');
  }

  self.getGameInfo();

}]);
