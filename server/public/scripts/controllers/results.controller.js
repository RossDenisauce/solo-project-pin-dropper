myApp.controller('ResultsController', ['$http', '$location', 'GameService', 'UserService', function ($http, $location, GameService, UserService) {
    console.log('ResultsController created');
    var self = this;

    self.distance = GameService.distance;
    self.miles = (self.distance * 0.621371).toFixed(2);
    self.score = GameService.score;
    self.didGuess = GameService.didGuess;


    self.findMidpoint = function (x, y) {
        return (x + y) / 2;
    }

    self.determineZoom = function () {
        var latDif = Math.abs(GameService.guessPosition.lat - GameService.newLocation.lat);
        var lngDif = Math.abs(GameService.guessPosition.lng - GameService.newLocation.lng);
        if (latDif < 2 && lngDif < 2) {
            return 7;
        } else if (latDif < 5 && lngDif < 5) {
            return 6;
        } else if (latDif < 10 && lngDif < 10) {
            return 5;
        } else if (latDif < 40 && lngDif < 40) {
            return 4;
        } else if (latDif < 55 && lngDif < 55) {
            return 3;
        } else {
            return 2;
        }
    }

    self.calculateScore = function (km) {
        if (km > 750) {
            self.score = Math.round(4500 * (Math.exp(-Math.pow(km, 2) / (2 * 200000))) + 2000 * (Math.exp(-Math.pow(km, 2) / (2 * 20000000))));
        } else if (self.didGuess == false) {
            self.score = 0;
        } else {
            self.score = Math.round(5000 * (Math.exp(-Math.pow(km, 2) / (2 * 580000))));
        }
    }

    self.assignMidpoint = function () {
        if (self.didGuess == true) {
            self.midpoint = {
                lat: self.findMidpoint(GameService.guessPosition.lat, GameService.newLocation.lat),
                lng: self.findMidpoint(GameService.guessPosition.lng, GameService.newLocation.lng)
            };
        } else {
            self.midpoint = GameService.newLocation;
            self.distance = 'Did not place a marker';
            self.miles = 'Did not place a marker';
        }
    }

    self.assignMidpoint();

    self.goHome = function () {
        $location.path('/user');
    }

    self.playAnother = function () {
        $location.path('/easy-mode');
    }

    self.postResults = function (distance, score) {

        scoreObject = {
            distance: distance,
            miles: self.miles,
            score: score
        };

        $http.post(`/api/easy-mode/${UserService.userObject.id}`, scoreObject)
            .then(function (response) {
                console.log('Successful post', response);
            })
            .catch(function (error) {
                console.log('Error on Post', error);
            });
    }

    self.initResultMap = function () {
        self.resultMap = new google.maps.Map(document.getElementById('resultMap'), {
            center: { lat: self.midpoint.lat, lng: self.midpoint.lng },
            zoom: self.determineZoom(),
            streetViewControl: false
        });

        self.actualMarker = new google.maps.Marker({ position: { lat: GameService.newLocation.lat, lng: GameService.newLocation.lng }, map: self.resultMap });
        if (self.didGuess == true) {
            self.guessMarker = new google.maps.Marker({ position: { lat: GameService.guessPosition.lat, lng: GameService.guessPosition.lng }, map: self.resultMap });

            var line = new google.maps.Polyline({
                path: [GameService.guessPosition, GameService.newLocation],
                strokeColor: "#000000",
                strokeOpacity: 1.0,
                strokeWeight: 3,
                map: self.resultMap
            });
        }
        self.calculateScore(self.distance);
    }

    self.initResultMap();

    self.initModal = function () {
        // Get the modal
        self.modal = document.getElementById('myModal');

        // Get the <span> element that closes the modal
        self.span = document.getElementsByClassName("close")[0];

        //Open the modal 
        self.modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        self.span.onclick = function () {
            self.postResults(self.distance, self.score);
            self.modal.style.display = "none";
        }
    }
    self.initModal();

}]);