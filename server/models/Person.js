const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  score: { type: Number, required: true },
  distance: { type: Schema.Types.Mixed, required: true },
  miles: { type: Schema.Types.Mixed, required: true },
  date: { type: Date, default: Date.now, required: true },
});


const PersonSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  games: [{ type: mongoose.Schema.ObjectId, ref: 'GameData' }]
});

const GameSchema = new Schema({
  lat: {type: Number},
  lng: {type: Number},
  scores: [{ type: mongoose.Schema.ObjectId, ref: 'ScoreData' }]
})

module.exports = {
  Person: mongoose.model('Person', PersonSchema),
  Score: mongoose.model('ScoreData', ScoreSchema),
  Game: mongoose.model('GameData', GameSchema)
};

