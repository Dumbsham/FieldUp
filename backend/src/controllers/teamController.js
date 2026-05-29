const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Team = require('../models/Team');

// @desc    Create a new team
// @route   POST /api/teams
// @access  Private (Coach/Admin)
exports.createTeam = asyncHandler(async (req, res, next) => {
  // Add user to req.body as coach
  req.body.coach = req.user.id;

  const team = await Team.create(req.body);

  res.status(201).json({
    success: true,
    data: team
  });
});

// @desc    Get team details and roster
// @route   GET /api/teams/:id
// @access  Public
exports.getTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.findById(req.params.id).populate('players');

  if (!team) {
    return next(new ErrorResponse(`Team not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: team
  });
});

// @desc    List all players in a team
// @route   GET /api/teams/:teamId/players
// @access  Public
exports.getTeamPlayers = asyncHandler(async (req, res, next) => {
  const team = await Team.findById(req.params.teamId).populate('players');

  if (!team) {
    return next(new ErrorResponse(`Team not found with id of ${req.params.teamId}`, 404));
  }

  res.status(200).json({
    success: true,
    count: team.players.length,
    data: team.players
  });
});
