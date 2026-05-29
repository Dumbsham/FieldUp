const express = require('express');
const {
  addPerformance,
  getPlayerPerformance,
  getMatchPerformance
} = require('../controllers/performanceController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .post(protect, authorize('coach', 'admin'), addPerformance);

router
  .route('/player/:playerId')
  .get(getPlayerPerformance);

router
  .route('/match/:matchId')
  .get(getMatchPerformance);

module.exports = router;
