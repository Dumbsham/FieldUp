const express = require('express');
const {
  createPlayer,
  getPlayer
} = require('../controllers/playerController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(protect, authorize('coach', 'admin'), createPlayer);

router.route('/:id')
  .get(getPlayer);

module.exports = router;
