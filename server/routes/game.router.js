const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Person = require('../models/Person').Person;
const ScoreData = require('../models/Person').Score;
const GameData = require('../models/Person').Game;

router.get('/:id', (req, res) => {
    Person.find({ "_id": req.params.id }, (error, response) => {
        if (error) {
            res.sendStatus(500);
        } else {
            res.send(response);
        }
    });
});

router.post('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        let newGameData = new GameData(req.body);
        newGameData.save((error, gameDoc) => {
            if (error) {
                res.sendStatus(500);
            } else {
                Person.findByIdAndUpdate(
                    { "_id": req.params.id },
                    { $push: { games: gameDoc._id } },
                    (pusherror, doc) => {
                        if (pusherror) {
                            console.log('error on push to score array: ', pusherror);
                            res.sendStatus(403);
                        } else {
                            console.log('updated Document: ', doc);
                            res.send(gameDoc._id);
                        }
                    }
                );
            }
        });
    } else {
        res.sendStatus(403);
    }
});

router.get('/game-data/:id', (req, res) => {
    if (req.isAuthenticated()) {
        Person.find({ "_id": req.params.id }).populate('games').exec((error, response) => {
            if (error) {
                res.sendStatus(500);
            } else {
                res.send(response);
            }
        });
    } else {
        res.sendStatus(500);
    }
});

router.post('/results/:id', (req, res) => {
    if (req.isAuthenticated()) {
        let newScoreData = new ScoreData(req.body);
        newScoreData.save((error, scoreDoc) => {
            if (error) {
                res.sendStatus(500);
            } else {
                GameData.findByIdAndUpdate(
                    { "_id": req.params.id },
                    { $push: { scores: scoreDoc._id } },
                    (pusherror, doc) => {
                        if (pusherror) {
                            console.log('error on push to score array: ', pusherror);
                            res.sendStatus(403);
                        } else {
                            console.log('updated Document: ', doc);
                            res.sendStatus(201);
                        }
                    }
                );
            }
        });
    } else {
        res.sendStatus(403);
    }
});

router.get('/score-data/:id', (req, res) => {
    if (req.isAuthenticated()) {
        Person.find({ "_id": req.params.id }, (error, response) => {
            if (error) {
                res.sendStatus(500);
            } else {
                GameData.find({}).populate('scores').exec((error, response) => {
                    if (error) {
                        res.sendStatus(500);
                    } else {
                        res.send(response);
                    }
                });
            }
        });
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;