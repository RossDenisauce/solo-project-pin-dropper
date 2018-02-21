myApp.service('GameService', ['$http', '$location', 'UserService', '$timeout', function ($http, $location, UserService, $timeout) {
    console.log('GameService created');
    var self = this;

    self.panorama;
    self.score;
    self.roundRepeat = false;

    self.tryAnother = function (lat, lng, id, gameMode, panoId) {
        self.roundRepeat = true;
        self.newLocation = { lat: lat, lng: lng };
        self.gameId = id;
        self.gameMode = gameMode;
        self.panoId = panoId;
    }

    self.easyMode = function () {
        self.gameMode = 'Easy';
    }

    self.timedMode = function () {
        self.gameMode = 'Timed';
    }

    self.initTimedMode = function () {
        self.timer = $timeout(self.submitGuess, 240000); // 4 minute timer
    }

    self.initMap = function () {
        self.createLocation();
        self.sv = new google.maps.StreetViewService();
        console.log(self.newLocation);

        self.panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
        self.panorama.setOptions({
            addressControl: false,
            showRoadLabels: false,
            linksControl: false
        });
        // Set the initial Street View camera to the center of the map

        self.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 85, lng: 0 },
            zoom: 1,
            streetViewControl: false
        });

        self.map.setOptions({ draggableCursor: 'crosshair' }); // Makes the guess map's cursor a "crosshair" instead of the default hand

        if (self.roundRepeat == true) {
            self.sv.getPanorama({ location: self.newLocation, preference: 'nearest', source: 'outdoor' }, self.processSVData);
        } else {
            self.sv.getPanorama({ location: self.newLocation, preference: 'nearest', source: 'outdoor', radius: 1000000 }, self.processSVData);
        }
    }
    self.createLocation = function () {
        if (self.roundRepeat == true) {
            console.log('Same Location');
        } else {
            self.landmassOne = Math.random() * 200 - 30;
            self.landmassTwo = Math.random() * -150 - 10;
            self.randomContinent = Math.round(Math.random());
            self.mapArea = [self.landmassOne, self.landmassTwo];
            self.newLocation = { lat: Math.random() * 140 - 60, lng: self.mapArea[self.randomContinent] };
        }
    }

    self.processSVData = function (data, status) {
        if (status === 'OK') {
            if (self.roundRepeat == true) {
                self.panorama.setPano(self.panoId);
            } else {
                self.panorama.setPano(data.location.pano);
                self.panoId = self.panorama.getPano();
            }
            self.panorama.setPov({
                heading: 0,
                pitch: 0
            });
            self.panorama.setVisible(true);
            self.map.addListener('click', self.addLatLng); //Adds click event to guess map
        } else { // tries finding a new lat and lng
            console.log('Street View data not found for this location.');
            self.createLocation();
            self.initMap();
        }
    }

    self.submitGuess = function () {
        if (self.gameMode == 'Timed') {
            $timeout.cancel(self.timer);
        }
        self.newLocation.lat = self.panorama.getPosition().lat();
        self.newLocation.lng = self.panorama.getPosition().lng();
        if (self.marker) {
            self.guessPosition = {
                lat: self.marker.getPosition().lat(),
                lng: self.marker.getPosition().lng()
            }
            console.log('guess:', self.guessPosition);
            console.log('answer:', self.newLocation);
            self.distance = self.getDistance(self.guessPosition, self.newLocation);
            self.didGuess = true;
        } else {
            self.guessPosition = {
                lat: 0,
                lng: 0
            }
            self.distance = -1;
            self.score = 0;
            self.didGuess = false;
        }

        var gamePosition = {
            lat: self.newLocation.lat,
            lng: self.newLocation.lng,
            gameMode: self.gameMode,
            panoId: self.panoId
        };
        if (self.roundRepeat == false) {
            $http.post(`/api/easy-mode/${UserService.userObject.id}`, gamePosition)
                .then(function (response) {
                    console.log('Successful post', response);
                    self.gameId = response.data;
                })
                .catch(function (error) {
                    console.log('Error on Post', error);
                });
        } else {
            console.log('Skipped post');
        }

        self.roundRepeat = false;
        $location.path('/results');
    }

    self.addLatLng = function (event) {
        if (!self.marker || !self.marker.setPosition) { //Adds a new marker only if there is not an existing one 
            self.marker = new google.maps.Marker({
                position: event.latLng, map: self.map, opacity: 0.75
            });
        } else { // Moves the current marker to where you click
            self.marker.setPosition(event.latLng);
        }
    }

    self.rad = function (x) {
        return x * Math.PI / 180; //turns into rads
    }

    self.getDistance = function (point1, point2) {
        var earthRadius = 6378137; // Earth's radius calculated in meters
        var distanceLat = self.rad(point2.lat - point1.lat);
        var distanceLng = self.rad(point2.lng - point1.lng);
        var a = Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
            Math.cos(self.rad(point1.lat)) * Math.cos(self.rad(point2.lat)) *
            Math.sin(distanceLng / 2) * Math.sin(distanceLng / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distance = earthRadius * c;
        distance /= 1000;
        return distance.toFixed(2); // returns the distance in km to 2 decimal places
    }

}]);