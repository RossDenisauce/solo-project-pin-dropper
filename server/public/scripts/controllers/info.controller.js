myApp.controller('InfoController', ['UserService', 'GameService', '$http', '$location', function (UserService, GameService, $http, $location) {
  console.log('InfoController created');
  var self = this;
  self.userService = UserService;
  // self.userService.userObject.username

  // self.getTableData = function () {
  //   $http.get(`/api/easy-mode/${UserService.userObject.id}`)
  //     .then(function (response) {
  //       console.log('successful get', response.data[0]);
  //       self.data = response.data[0];
  //     })
  //     .catch(function (error) {
  //       console.error('error on get info', error);
  //     })
  // }

  // self.getTableData();

  self.getGameInfo = function () {
    $http.get(`/api/easy-mode/game-data/${UserService.userObject.id}`)
      .then((response) => {
        console.log('game get request success', response);
      })
      .catch((error) => {
        console.log('Error on get request', error);
      })
  }

  self.getScoreInfo = function () {
    $http.get(`/api/easy-mode/score-data/${UserService.userObject.id}`)
      .then((response) => {
        console.log('game get request success', response);
        self.data = response.data;
      })
      .catch((error) => {
        console.log('Error on get request', error);

      })
  }

  self.tryAnother = function(lat, lng, id){
    GameService.tryAnother(lat, lng, id);
    $location.path('/easy-mode');
  }

  self.getGameInfo();
  self.getScoreInfo();
  // GameService.getGameInfo();
  // self.data = GameService.data;

}]);
