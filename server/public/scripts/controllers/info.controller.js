myApp.controller('InfoController', ['UserService', 'GameService', '$http', function (UserService, GameService, $http) {
  console.log('InfoController created');
  var self = this;
  self.userService = UserService;
  // self.userService.userObject.username

  self.data = {};

  self.getTableData = function () {
    $http.get(`/api/easy-mode/${UserService.userObject.id}`)
      .then(function (response) {
        console.log('successful get', response.data[0]);
        self.data = response.data[0];
        // for (let i = 0; i < self.data.Scores.length; i++) {
        //   if (self.data.Scores[i].distance === -1) {
        //     self.data.Scores[i].distance = 'Did not place a marker';
        //     self.data.Scores[i].miles = 'Did not place a marker';
        //   }
        // }
      })
      .catch(function (error) {
        console.error('error on get info', error);
      })
  }

  self.getTableData();
}]);
