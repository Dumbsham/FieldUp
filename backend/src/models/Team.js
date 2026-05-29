const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a team name'],
    unique: true,
    trim: true, //Removes spaces from start and end. "   Royal Warriors   " -> "Royal Warriors"
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  coach: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false
  },
  academy: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    required: [true, 'Please add a city']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Reverse populate with virtuals
TeamSchema.virtual('players', {
  ref: 'Player',
  localField: '_id',
  foreignField: 'team',
  justOne: false
});

module.exports = mongoose.model('Team', TeamSchema);
