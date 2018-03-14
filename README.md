# Pin Dropper

Pin Dropper is a web game where you are given a randomly generated Google Map Panorama view and you try to find out where you are in the world. You use clues based on the environment, the language, or anything you can to figure out where you are. Once you know where you are, or think you know where you are, you place a pin on a map of the world on the desired location and hit submit. You are taken to a page with your results which include your score for the game and the distance you were away.

## Built With

 - Javascript
 - Node.js
 - Express.js
 - AngularJS
 - MongoDB
 - Google Maps API

## Getting Started

Download the zip of the repo and `npm install`, run mongoDB with the comand `mongod`, the port is `7845`, lastly just `npm start`

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

### Completed Features

- [x] Randomly generate google map panorama views
- [x] Allow guesses
- [x] Give scores and distances away & store them in a database
- [x] Users must make an account to play
- [x] Users can view past games and replay or delete them if they choose
- [x] Timed mode is set to a static 4 minutes

### Next Steps

- [ ] Challenege other users to games
- [ ] Add Adjustable timer for timed mode

## Screenshots

### Home Page
! [alt text](https://github.com/RossDenisauce/solo-project-pin-dropper/blob/master/server/public/images/Home-page.png)
### The start of a game
! [alt text](https://github.com/RossDenisauce/solo-project-pin-dropper/blob/master/server/public/images/Start-game.png)
### Results Page
! [alt text](https://github.com/RossDenisauce/solo-project-pin-dropper/blob/masterserver/public/images/Result-page.png)
### User Data
! [alt text](https://github.com/RossDenisauce/solo-project-pin-dropper/blob/master/server/public/images/User-data.png)

## Deployment

Have to activate MLab for deployment on heroku

## Authors

* Ross Denison

## Acknowledgments

* Huge shout out to [Geoguessr](https://geoguessr.com/) which was the inspiration for this game
* Google Maps API documentation was used heavily
