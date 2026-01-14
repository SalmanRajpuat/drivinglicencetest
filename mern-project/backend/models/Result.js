const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizQuestions: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz'
        },
        userAnswer: Number,
        isCorrect: Boolean
    }],
    score: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    correctAnswers: {
        type: Number,
        required: true
    },
    timeElapsed: {
        type: Number, // in seconds
        required: true
    },
    passed: {
        type: Boolean,
        required: true
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
resultSchema.index({ user: 1, completedAt: -1 });

module.exports = mongoose.model('Result', resultSchema);
