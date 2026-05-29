const express = require('express');
const {
  createMatch,
  getMatches,
  getMatchDetails,
  updateScorecard
} = require('../controllers/matchController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getMatches)
  .post(protect, authorize('coach', 'admin'), createMatch);

router
  .route('/:id')
  .get(getMatchDetails);

router
  .route('/:id/scorecard')
  .put(protect, authorize('coach', 'admin'), updateScorecard);

module.exports = router;
