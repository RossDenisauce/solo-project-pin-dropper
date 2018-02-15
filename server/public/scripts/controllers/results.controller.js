myApp.controller('ResultsController', ['$http', '$location', 'GameService', function($http, $location, GameService) {
    console.log('ResultsController created');
    var self = this;

    self.distance = GameService.distance;
    self.score = GameService.score;

    self.findMidpoint = function(x, y){
        return (x + y) / 2;
    }

    self.determineZoom = function(){
        var latDif = Math.abs(GameService.guessPosition.lat - GameService.newLocation.lat);
        var lngDif = Math.abs(GameService.guessPosition.lng - GameService.newLocation.lng);
        if(latDif < 2 && lngDif < 2){
            return 7;
        } else if(latDif < 5 && lngDif < 5){
            return 6;
        } else if(latDif < 10 && lngDif < 10){
            return 5;
        } else if(latDif < 40 && lngDif < 40){
            return 3;
        } else if(latDif < 55 && lngDif < 55){
            return 3;
        } else{
            return 2;
        }
    }

    self.calculateScore = function(km){
        if(km > 750){
            self.score = Math.round(4500 * (Math.exp(-Math.pow(km, 2)/(2*200000))) + 2000 * (Math.exp(-Math.pow(km, 2)/(2*20000000))));
        } else if(km == 0){
            self.score = 0;
        } else{
            self.score = Math.round(5000 * (Math.exp(-Math.pow(km, 2)/(2*580000))));
        }
    }
        if(!self.distance == 0){
        self.midpoint = {
            lat: self.findMidpoint(GameService.guessPosition.lat, GameService.newLocation.lat),
            lng: self.findMidpoint(GameService.guessPosition.lng, GameService.newLocation.lng)
        };
    } else {
        self.midpoint = GameService.newLocation;
    }

    self.goHome = function(){
        GameService.goHome();
    }
    
    self.initResultMap = function(){ 
        self.resultMap = new google.maps.Map(document.getElementById('resultMap'), {
            center: {lat: self.midpoint.lat, lng: self.midpoint.lng},
            zoom: self.determineZoom(),
            streetViewControl: false
        });
          
        
        self.actualMarker = new google.maps.Marker({position: {lat: GameService.newLocation.lat, lng:GameService.newLocation.lng}, map: self.resultMap});
        if(self.distance !== 0){
            self.guessMarker = new google.maps.Marker({position: {lat: GameService.guessPosition.lat, lng:GameService.guessPosition.lng}, map: self.resultMap});

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
    console.log(self.midpoint);
}]);