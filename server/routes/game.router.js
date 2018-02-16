const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Person = require('../models/Person').Person;
const ScoreData = require('../models/Person').Score;

router.get('/:id', (req, res) => {
    Person.find({"_id": req.params.id}, function(error, response) {
        if(error) {
            res.sendStatus(500);
        } else {
            res.send(response);
        }
    });
});

router.post('/:id', (req, res) => {
    if(req.isAuthenticated()) {
        let newScoreData = new ScoreData(req.body);
        
        Person.findByIdAndUpdate(
            {"_id": req.params.id},
            {$push: {Scores: newScoreData} },
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
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;