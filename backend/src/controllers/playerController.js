const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Player = require('../models/Player');
const Team = require('../models/Team');

// @desc    Create/Add player profile
// @route   POST /api/players
// @access  Private (Coach/Admin)
exports.createPlayer = asyncHandler(async (req, res, next) => {
  // Check if team exists
  const team = await Team.findById(req.body.team);

  if (!team) {
    return next(new ErrorResponse(`No team with the id of ${req.body.team}`, 404));
  }

  // Make sure user is team coach or admin
  if (team.coach.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to add a player to this team`, 401));
  }

  const player = await Player.create(req.body);

  res.status(201).json({
    success: true,
    data: player
  });
});

// @desc    Get player statistics and fitness data
// @route   GET /api/players/:id
// @access  Public
exports.getPlayer = asyncHandler(async (req, res, next) => {
  const player = await Player.findById(req.params.id).populate({
    path: 'team',
    select: 'name city'
  });

  if (!player) {
    return next(new ErrorResponse(`Player not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: player
  });
});
