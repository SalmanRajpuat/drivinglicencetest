const Result = require('../models/Result');
const User = require('../models/User');

// @desc    Submit quiz result
// @route   POST /api/results
// @access  Private
exports.submitResult = async (req, res) => {
    try {
        const {
            quizQuestions,
            score,
            percentage,
            totalQuestions,
            correctAnswers,
            timeElapsed,
            passed
        } = req.body;

        const result = await Result.create({
            user: req.user.id,
            quizQuestions,
            score,
            percentage,
            totalQuestions,
            correctAnswers,
            timeElapsed,
            passed
        });

        // Update user statistics
        const user = await User.findById(req.user.id);
        user.quizzesTaken += 1;
        user.totalScore += score;
        if (percentage > user.bestScore) {
            user.bestScore = percentage;
        }
        await user.save();

        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get user's quiz results
// @route   GET /api/results/user
// @access  Private
exports.getUserResults = async (req, res) => {
    try {
        const results = await Result.find({ user: req.user.id })
            .populate('quizQuestions.question')
            .sort('-completedAt');

        res.json({
            success: true,
            count: results.length,
            data: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single result
// @route   GET /api/results/:id
// @access  Private
exports.getResultById = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id)
            .populate('user', 'name email')
            .populate('quizQuestions.question');

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Result not found'
            });
        }

        // Check if user owns this result
        if (result.user._id.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this result'
            });
        }

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get leaderboard
// @route   GET /api/results/leaderboard
// @access  Public
exports.getLeaderboard = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;

        const leaderboard = await User.find()
            .select('name bestScore quizzesTaken')
            .sort('-bestScore -quizzesTaken')
            .limit(limit);

        res.json({
            success: true,
            data: leaderboard
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
