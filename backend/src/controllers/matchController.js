const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Match = require('../models/Match');
const Team = require('../models/Team');

// @desc    Initialize a new match
// @route   POST /api/matches
// @access  Private (Coach/Admin)
exports.createMatch = asyncHandler(async (req, res, next) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return next(new ErrorResponse('Home team and away team cannot be the same', 400));
  }

  // Check if teams exist
  const home = await Team.findById(homeTeam);
  const away = await Team.findById(awayTeam);

  if (!home || !away) {
    return next(new ErrorResponse('One or both teams not found', 404));
  }

  // Check if user is coach of either team or admin
  const isHomeCoach = home.coach && home.coach.toString() === req.user.id;
  const isAwayCoach = away.coach && away.coach.toString() === req.user.id;

  if (req.user.role !== 'admin' && !isHomeCoach && !isAwayCoach) {
    return next(new ErrorResponse('Not authorized to create a match for these teams', 403));
  }

  const match = await Match.create(req.body);

  res.status(201).json({
    success: true,
    data: match
  });
});

// @desc    Get all matches (with optional team filtering)
// @route   GET /api/matches
// @access  Public
exports.getMatches = asyncHandler(async (req, res, next) => {
  let query;

  if (req.query.teamId) {
    query = Match.find({
      $or: [
        { homeTeam: req.query.teamId },
        { awayTeam: req.query.teamId }
      ]
    });
  } else {
    query = Match.find();
  }

  const matches = await query.populate('homeTeam awayTeam');

  res.status(200).json({
    success: true,
    count: matches.length,
    data: matches
  });
});

// @desc    Fetch full scorecard / match details
// @route   GET /api/matches/:id
// @access  Public
exports.getMatchDetails = asyncHandler(async (req, res, next) => {
  const match = await Match.findById(req.params.id).populate('homeTeam awayTeam winner');

  if (!match) {
    return next(new ErrorResponse(`Match not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: match
  });
});

// @desc    Live scoring updates
// @route   PUT /api/matches/:id/scorecard
// @access  Private (Coach/Admin)
exports.updateScorecard = asyncHandler(async (req, res, next) => {
  let match = await Match.findById(req.params.id);

  if (!match) {
    return next(new ErrorResponse(`Match not found with id of ${req.params.id}`, 404));
  }

  const home = await Team.findById(match.homeTeam);
  const away = await Team.findById(match.awayTeam);

  // Check authorization
  const isHomeCoach = home.coach && home.coach.toString() === req.user.id;
  const isAwayCoach = away.coach && away.coach.toString() === req.user.id;

  if (req.user.role !== 'admin' && !isHomeCoach && !isAwayCoach) {
    return next(new ErrorResponse('Not authorized to update this match scorecard', 403));
  }

  // Only allow updating status, scorecard, and winner
  const fieldsToUpdate = {};
  if (req.body.status) fieldsToUpdate.status = req.body.status;
  if (req.body.scorecard) fieldsToUpdate.scorecard = req.body.scorecard;
  if (req.body.winner) fieldsToUpdate.winner = req.body.winner;

  match = await Match.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: match
  });
});
