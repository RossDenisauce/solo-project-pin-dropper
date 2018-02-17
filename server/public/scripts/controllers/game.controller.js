myApp.controller('GameController', ['$http', '$location', 'GameService', function($http, $location, GameService) {
    console.log('GameController created');
    var self = this;

    self.distance = GameService.distance;

    self.initModal = function(){
        // Get the modal
        self.modal = document.getElementById('gameModal');

        // Get the <span> element that closes the modal
        self.span = document.getElementsByClassName("close2")[0];

        // Opens the modal 
        self.modal.style.display = "block";

        // When the user clicks on <span>, close the modal
        self.span.onclick = function() {
            self.modal.style.display = "none";
        }
   
}

    self.submitGuess = function(){
        GameService.submitGuess();
    }

    delete GameService.marker;
    GameService.initMap();

    self.initModal();
    
}]);