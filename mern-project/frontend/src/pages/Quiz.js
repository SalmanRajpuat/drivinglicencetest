import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Quiz.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (quizStarted && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeRemaining === 0) {
            handleSubmitQuiz();
        }
    }, [quizStarted, timeRemaining]);

    const startQuiz = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/quiz/random?limit=20');
            setQuestions(response.data.data);
            setQuizStarted(true);
            setSelectedAnswers(new Array(20).fill(null));
        } catch (error) {
            alert('Failed to load questions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectOption = (optionIndex) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = optionIndex;
        setSelectedAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmitQuiz = async () => {
        const correctAnswers = selectedAnswers.reduce((acc, answer, index) => {
            return answer === questions[index].correct ? acc + 1 : acc;
        }, 0);

        const percentage = Math.round((correctAnswers / questions.length) * 100);
        const timeElapsed = 900 - timeRemaining;

        const resultData = {
            quizQuestions: questions.map((q, index) => ({
                question: q._id,
                userAnswer: selectedAnswers[index],
                isCorrect: selectedAnswers[index] === q.correct
            })),
            score: correctAnswers,
            percentage,
            totalQuestions: questions.length,
            correctAnswers,
            timeElapsed,
            passed: percentage >= 70
        };

        if (user) {
            try {
                await axios.post('http://localhost:5000/api/results', resultData);
            } catch (error) {
                console.error('Failed to save result:', error);
            }
        }

        navigate('/results', { state: { resultData, questions, selectedAnswers } });
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimerColor = () => {
        if (timeRemaining <= 60) return '#e74c3c';
        if (timeRemaining <= 300) return '#f39c12';
        return '#27ae60';
    };

    if (!quizStarted) {
        return (
            <section className="quiz-section">
                <div className="quiz-container">
                    <div className="start-screen">
                        <h2>Ready to Start?</h2>
                        <p>This quiz contains 20 questions and you'll have 15 minutes to complete it.</p>
                        <p>You need 70% to pass the quiz.</p>
                        {!user && (
                            <p className="warning">
                                <i className="fas fa-info-circle"></i> 
                                Login to save your results
                            </p>
                        )}
                        <button 
                            className="btn btn-primary" 
                            onClick={startQuiz}
                            disabled={loading}
                        >
                            <i className="fas fa-play"></i> 
                            {loading ? 'Loading...' : 'Start Quiz'}
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <section className="quiz-section">
            <div className="quiz-container">
                <div className="quiz-header">
                    <div className="progress-container">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                        <span className="progress-text">
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </span>
                    </div>
                    <div className="timer" style={{ color: getTimerColor() }}>
                        {formatTime(timeRemaining)}
                    </div>
                </div>

                <div className="question-container">
                    <div className="question">{currentQuestion.question}</div>
                    <div className="options">
                        {currentQuestion.options.map((option, index) => (
                            <div
                                key={index}
                                className={`option ${selectedAnswers[currentQuestionIndex] === index ? 'selected' : ''}`}
                                onClick={() => handleSelectOption(index)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="quiz-controls">
                    <button 
                        className="btn btn-secondary" 
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                    >
                        <i className="fas fa-arrow-left"></i> Previous
                    </button>
                    {currentQuestionIndex < questions.length - 1 ? (
                        <button className="btn btn-primary" onClick={handleNext}>
                            Next <i className="fas fa-arrow-right"></i>
                        </button>
                    ) : (
                        <button className="btn btn-success" onClick={handleSubmitQuiz}>
                            <i className="fas fa-check"></i> Submit Quiz
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Quiz;
