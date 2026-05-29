const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  homeTeam: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Please add a home team']
  },
  awayTeam: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Please add an away team']
  },
  date: {
    type: Date,
    required: [true, 'Please add a date']
  },
  venue: {
    type: String,
    required: [true, 'Please add a venue']
  },
  format: {
    type: String,
    required: [true, 'Please add a match format'],
    enum: ['T20', 'ODI', 'Test', 'Other']
  },
  status: {
    type: String,
    enum: ['scheduled', 'live', 'completed'],
    default: 'scheduled'
  },
  scorecard: {
    innings1: {
      team: { type: mongoose.Schema.ObjectId, ref: 'Team' },
      runs: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      overs: { type: Number, default: 0 }
    },
    innings2: {
      team: { type: mongoose.Schema.ObjectId, ref: 'Team' },
      runs: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      overs: { type: Number, default: 0 }
    }
  },
  winner: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Match', MatchSchema);
