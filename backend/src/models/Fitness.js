const mongoose = require('mongoose');

const FitnessSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.ObjectId,
    ref: 'Player',
    required: [true, 'Please add a player']
  },
  date: {
    type: Date,
    default: Date.now
  },
  fatigue: {
    type: Number,
    required: [true, 'Please add fatigue level'],
    min: 1,
    max: 10
  },
  sleep: {
    type: Number,
    required: [true, 'Please add sleep hours'],
    min: 0,
    max: 24
  },
  workload: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Extreme'],
    required: [true, 'Please add workload']
  },
  recoveryScore: {
    type: Number,
    min: 1,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Fitness', FitnessSchema);
