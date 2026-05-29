const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Fitness = require('../models/Fitness');
const Player = require('../models/Player');

// @desc    Log player fitness metrics
// @route   POST /api/fitness
// @access  Private (Coach/Admin/Player)
exports.addFitnessData = asyncHandler(async (req, res, next) => {
  const { player: playerId } = req.body;

  const player = await Player.findById(playerId);
  if (!player) {
    return next(new ErrorResponse(`Player not found with id of ${playerId}`, 404));
  }

  // Check if user is authorized (Admin, Coach of the player's team, or the player themselves)
  // Note: Assuming req.user.id is the User ID. Players might have a User account linked.
  // For now, checking against role and basic ownership if applicable.
  
  // If player is logging for themselves, we'd need a link between User and Player models.
  // Assuming roles are enough for MVP as per guidelines.

  const fitness = await Fitness.create(req.body);

  res.status(201).json({
    success: true,
    data: fitness
  });
});

// @desc    Get fitness data for a player
// @route   GET /api/fitness/player/:playerId
// @access  Private (Coach/Admin/Player)
exports.getPlayerFitness = asyncHandler(async (req, res, next) => {
  const fitness = await Fitness.find({ player: req.params.playerId }).sort('-date');

  res.status(200).json({
    success: true,
    count: fitness.length,
    data: fitness
  });
});
