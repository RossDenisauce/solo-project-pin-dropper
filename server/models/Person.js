const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    score: {type: Number, required: true},
    distance:  {type: Schema.Types.Mixed, required: true},
    miles: {type: Schema.Types.Mixed, required: true},
    date: {type: Date, default: Date.now, required: true},
  });
  
  
  const PersonSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    Scores: [ScoreSchema]
  });

  module.exports = {
    Person: mongoose.model('Person', PersonSchema),
    Score: mongoose.model('ScoreData', ScoreSchema)
  };
  
