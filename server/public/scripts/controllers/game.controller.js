myApp.controller('GameController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
    console.log('GameController created');
    var self = this;

    self.panorama;

    self.landmassOne = Math.random() * 200 - 30;
    self.landmassTwo = Math.random() * 160 - 10;
    self.mapArea = [self.landmassOne, self.landmassTwo];
    self.randomContinent = Math.floor(Math.random() * 1);

    self.newLocation = {lat: Math.random() * 140 - 60, lng: self.mapArea[self.randomContinent]};

    self.initMap = function(){
        var sv = new google.maps.StreetViewService();
        console.log(self.newLocation);
        
        self.panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
        self.panorama.setOptions({
            addressControl: false,
            showRoadLabels: false,
            linksControl: false
        });
        // Set the initial Street View camera to the center of the map
        sv.getPanorama({location: self.newLocation, preference: 'nearest', radius: 1000000}, self.processSVData);

        self.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 75, lng: 0},
            zoom: 1,
            streetViewControl: false
          });
    
    }
    self.createLocation = function(){
        self.landmassOne = Math.random() * 200 - 30;
        self.landmassTwo = Math.random() * 160 - 10;
        self.randomContinent = Math.floor(Math.random() * 1);
        self.mapArea = [self.landmassOne, self.landmassTwo];
        self.newLocation = {lat: Math.random() * 140 - 60, lng: self.mapArea[self.randomContinent]};
      }
      
    self.processSVData = function(data, status) {
        if (status === 'OK') {
            self.map.addListener('click', function(event){
                var marker = new google.maps.Marker({map: self.map});
                
            });
        
            self.panorama.setPano(data.location.pano);
            self.panorama.setPov({
                heading: 0,
                pitch: 0
            });
            self.panorama.setVisible(true);

    } else {
        console.error('Street View data not found for this location.');
        self.createLocation();
        self.initMap();
    }
    }

    self.getMap = function(){
        // $http.get('/api/easy-mode')
        //     .then(function(response){
        //         console.log(response.data);
        //         self.initMap();
                
        //     })
        //     .catch(function(error){
        //         console.log('Error:', error);
        //     })
    }

    self.initMap();

}]);