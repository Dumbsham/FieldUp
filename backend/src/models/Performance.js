const mongoose = require('mongoose');

const PerformanceSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.ObjectId,
    ref: 'Player',
    required: [true, 'Please add a player']
  },
  match: {
    type: mongoose.Schema.ObjectId,
    ref: 'Match',
    required: [true, 'Please add a match']
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Please add a team']
  },
  batting: {
    runs: { type: Number, default: 0 },
    balls: { type: Number, default: 0 },
    fours: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 }
  },
  bowling: {
    overs: { type: Number, default: 0 },
    maidens: { type: Number, default: 0 },
    runsConceded: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 }
  },
  fielding: {
    catches: { type: Number, default: 0 },
    stumpings: { type: Number, default: 0 },
    runouts: { type: Number, default: 0 }
  },
  staminaScore: {
    type: Number,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Performance', PerformanceSchema);
