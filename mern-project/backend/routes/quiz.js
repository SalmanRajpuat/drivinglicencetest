const express = require('express');
const router = express.Router();
const {
    getQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getRandomQuestions
} = require('../controllers/quizController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/random', getRandomQuestions);
router.get('/:id', getQuestionById);

// Protected routes
router.get('/', protect, getQuestions);

// Admin only routes
router.post('/', protect, admin, createQuestion);
router.put('/:id', protect, admin, updateQuestion);
router.delete('/:id', protect, admin, deleteQuestion);

module.exports = router;
