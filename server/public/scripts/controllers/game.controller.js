myApp.controller('GameController', ['$http', '$location', 'GameService', '$timeout', function($http, $location, GameService, $timeout) {
    console.log('GameController created');
    var self = this;

    self.distance = GameService.distance;
    self.time = 240;

    self.initModal = function(){
        // Get the modal
        self.modal = document.getElementById('gameModal');

        // Get the <span> element that closes the modal
        self.span = document.getElementsByClassName("close2")[0];

        // Opens the modal 
        self.modal.style.display = "block";

        // When the user clicks on <span>, close the modal
        self.span.onclick = function() {
            self.modal.style.display = "none"; // Closes the modal
            if(GameService.gameMode == 'Timed'){
                GameService.initTimedMode(); // Starts the countdown that will force a guess if not submitted in time
                self.timer(); // Starts the timer after closing the instructions
            }
        }
}

self.timer = function() {
    if( self.time > 0 ) {
        self.time -= 1;
        $timeout(self.timer, 1000);
    }
}

    self.submitGuess = function(){
        $timeout.cancel(self.timer);
        GameService.submitGuess();
    }

    delete GameService.marker;
    GameService.initMap();

    self.initModal();
    
}]);