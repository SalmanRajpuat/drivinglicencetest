const express = require('express');
const router = express.Router();
const {
    submitResult,
    getUserResults,
    getResultById,
    getLeaderboard
} = require('../controllers/resultController');
const { protect } = require('../middleware/auth');

router.post('/', protect, submitResult);
router.get('/user', protect, getUserResults);
router.get('/leaderboard', getLeaderboard);
router.get('/:id', protect, getResultById);

module.exports = router;
