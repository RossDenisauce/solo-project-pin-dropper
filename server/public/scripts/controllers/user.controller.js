myApp.controller('UserController', ['UserService', '$location', 'GameService', function(UserService, $location, GameService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  self.easyMode = function(){
    GameService.easyMode();
    $location.path("/easy-mode");
  }

  self.timedMode = function(){
    GameService.timedMode();
    $location.path("/easy-mode");
  }
}]);

