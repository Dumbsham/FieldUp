const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Please add a team']
  },
  battingStyle: {
    type: String,
    enum: ['Right-hand Bat', 'Left-hand Bat'],
    required: true
  },
  bowlingStyle: {
    type: String,
    enum: ['Right-arm Fast', 'Right-arm Medium', 'Right-arm Spin', 'Left-arm Fast', 'Left-arm Medium', 'Left-arm Spin', 'None'],
    default: 'None'
  },
  role: {
    type: String,
    enum: ['Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper'],
    required: true
  },
  stats: {
    matches: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    average: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Player', PlayerSchema);
