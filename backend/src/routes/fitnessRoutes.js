const express = require('express');
const {
  addFitnessData,
  getPlayerFitness
} = require('../controllers/fitnessController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .post(protect, authorize('player', 'coach', 'admin'), addFitnessData);

router
  .route('/player/:playerId')
  .get(protect, getPlayerFitness);

module.exports = router;
