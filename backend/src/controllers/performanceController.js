const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Performance = require('../models/Performance');
const Match = require('../models/Match');
const Team = require('../models/Team');
const Player = require('../models/Player');

// @desc    Log player performance for a match
// @route   POST /api/performance
// @access  Private (Coach/Admin)
exports.addPerformance = asyncHandler(async (req, res, next) => {
  const { match: matchId, team: teamId, player: playerId } = req.body;

  const match = await Match.findById(matchId);
  if (!match) {
    return next(new ErrorResponse(`Match not found with id of ${matchId}`, 404));
  }

  const team = await Team.findById(teamId);
  if (!team) {
    return next(new ErrorResponse(`Team not found with id of ${teamId}`, 404));
  }

  const player = await Player.findById(playerId);
  if (!player) {
    return next(new ErrorResponse(`Player not found with id of ${playerId}`, 404));
  }

  // Check if player belongs to the team
  if (player.team.toString() !== teamId) {
    return next(new ErrorResponse('Player does not belong to the specified team', 400));
  }

  // Check if team is part of the match
  if (match.homeTeam.toString() !== teamId && match.awayTeam.toString() !== teamId) {
    return next(new ErrorResponse('Team is not part of this match', 400));
  }

  // Check if user is coach of the team or admin
  const isCoach = team.coach && team.coach.toString() === req.user.id;

  if (req.user.role !== 'admin' && !isCoach) {
    return next(new ErrorResponse('Not authorized to log performance for this team', 403));
  }

  const performance = await Performance.create(req.body);

  res.status(201).json({
    success: true,
    data: performance
  });
});

// @desc    Get performance logs for a player
// @route   GET /api/performance/player/:playerId
// @access  Public
exports.getPlayerPerformance = asyncHandler(async (req, res, next) => {
  const performance = await Performance.find({ player: req.params.playerId }).populate('match team');

  res.status(200).json({
    success: true,
    count: performance.length,
    data: performance
  });
});

// @desc    Get performance logs for a match
// @route   GET /api/performance/match/:matchId
// @access  Public
exports.getMatchPerformance = asyncHandler(async (req, res, next) => {
  const performance = await Performance.find({ match: req.params.matchId }).populate('player team');

  res.status(200).json({
    success: true,
    count: performance.length,
    data: performance
  });
});
