const Quiz = require('../models/Quiz');

// @desc    Get all quiz questions
// @route   GET /api/quiz
// @access  Private
exports.getQuestions = async (req, res) => {
    try {
        const questions = await Quiz.find({ isActive: true });
        
        res.json({
            success: true,
            count: questions.length,
            data: questions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get random quiz questions
// @route   GET /api/quiz/random
// @access  Public
exports.getRandomQuestions = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 20;
        
        const questions = await Quiz.aggregate([
            { $match: { isActive: true } },
            { $sample: { size: limit } }
        ]);
        
        res.json({
            success: true,
            count: questions.length,
            data: questions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single quiz question
// @route   GET /api/quiz/:id
// @access  Public
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Quiz.findById(req.params.id);
        
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }
        
        res.json({
            success: true,
            data: question
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create new quiz question
// @route   POST /api/quiz
// @access  Private/Admin
exports.createQuestion = async (req, res) => {
    try {
        const question = await Quiz.create(req.body);
        
        res.status(201).json({
            success: true,
            data: question
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update quiz question
// @route   PUT /api/quiz/:id
// @access  Private/Admin
exports.updateQuestion = async (req, res) => {
    try {
        const question = await Quiz.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }
        
        res.json({
            success: true,
            data: question
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete quiz question
// @route   DELETE /api/quiz/:id
// @access  Private/Admin
exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Quiz.findByIdAndDelete(req.params.id);
        
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Question deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
