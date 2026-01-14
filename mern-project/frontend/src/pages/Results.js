import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showReview, setShowReview] = useState(false);

    const { resultData, questions, selectedAnswers } = location.state || {};

    if (!resultData || !questions) {
        return (
            <section className="results-section">
                <div className="results-container">
                    <h2>No Results Found</h2>
                    <p>Please take a quiz first to see your results.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/quiz')}>
                        Take Quiz
                    </button>
                </div>
            </section>
        );
    }

    const { percentage, correctAnswers, totalQuestions, timeElapsed, passed } = resultData;

    const getGrade = () => {
        if (percentage >= 85) {
            return {
                grade: 'Excellent',
                class: 'score-excellent',
                message: 'Outstanding! You have excellent knowledge of traffic rules.'
            };
        } else if (percentage >= 70) {
            return {
                grade: 'Good',
                class: 'score-good',
                message: 'Well done! You passed the test successfully.'
            };
        } else {
            return {
                grade: 'Poor',
                class: 'score-poor',
                message: 'You need more practice. Study the traffic rules and try again.'
            };
        }
    };

    const { grade, class: gradeClass, message } = getGrade();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (showReview) {
        return (
            <section className="results-section">
                <div className="results-container">
                    <h2>Answer Review</h2>
                    {questions.map((question, index) => {
                        const userAnswer = selectedAnswers[index];
                        const isCorrect = userAnswer === question.correct;
                        return (
                            <div 
                                key={index}
                                className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}
                            >
                                <h4>Question {index + 1}</h4>
                                <p><strong>{question.question}</strong></p>
                                <p>
                                    Your answer: 
                                    <span className={isCorrect ? 'text-success' : 'text-danger'}>
                                        {userAnswer !== null ? question.options[userAnswer] : 'Not answered'}
                                    </span>
                                </p>
                                {!isCorrect && (
                                    <p>
                                        Correct answer: 
                                        <span className="text-success">
                                            {question.options[question.correct]}
                                        </span>
                                    </p>
                                )}
                                <p><small><em>{question.explanation}</em></small></p>
                            </div>
                        );
                    })}
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => setShowReview(false)}
                    >
                        <i className="fas fa-arrow-left"></i> Back to Results
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="results-section">
            <div className="results-container">
                <div className="results-card">
                    <h2>Quiz Results</h2>
                    <div className={`score-circle ${gradeClass}`}>
                        {percentage}%
                    </div>
                    <h3>{grade}</h3>
                    <p>{message}</p>
                    
                    <div className="results-stats">
                        <div className="stat-item">
                            <div className="stat-value">{correctAnswers}/{totalQuestions}</div>
                            <div className="stat-label">Correct Answers</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">{percentage}%</div>
                            <div className="stat-label">Score</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">{formatTime(timeElapsed)}</div>
                            <div className="stat-label">Time Taken</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">{passed ? 'PASS' : 'FAIL'}</div>
                            <div className="stat-label">Result</div>
                        </div>
                    </div>
                    
                    <div className="results-actions">
                        <button 
                            className="btn btn-primary" 
                            onClick={() => setShowReview(true)}
                        >
                            <i className="fas fa-eye"></i> Review Answers
                        </button>
                        <button 
                            className="btn btn-success" 
                            onClick={() => navigate('/quiz')}
                        >
                            <i className="fas fa-redo"></i> Retake Quiz
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Results;
