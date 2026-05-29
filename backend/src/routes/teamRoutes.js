const express = require('express');
const {
  createTeam,
  getTeam,
  getTeamPlayers
} = require('../controllers/teamController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(protect, authorize('coach', 'admin'), createTeam);

router.route('/:id')
  .get(getTeam);

router.route('/:teamId/players')
  .get(getTeamPlayers);

module.exports = router;
