import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user, isAuthenticated } = useAuth();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        fetchResults();
    }, [isAuthenticated, navigate]);

    const fetchResults = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/results/user');
            setResults(response.data.data);
        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <section className="profile-section">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <h2>{user?.name}</h2>
                    <p>{user?.email}</p>
                </div>

                <div className="profile-stats">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-clipboard-list"></i>
                        </div>
                        <div className="stat-info">
                            <h3>{user?.quizzesTaken || 0}</h3>
                            <p>Quizzes Taken</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-trophy"></i>
                        </div>
                        <div className="stat-info">
                            <h3>{user?.bestScore || 0}%</h3>
                            <p>Best Score</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <div className="stat-info">
                            <h3>
                                {user?.quizzesTaken > 0 
                                    ? Math.round(user.totalScore / user.quizzesTaken) 
                                    : 0}%
                            </h3>
                            <p>Average Score</p>
                        </div>
                    </div>
                </div>

                <div className="quiz-history">
                    <h3>Quiz History</h3>
                    {loading ? (
                        <p>Loading...</p>
                    ) : results.length === 0 ? (
                        <p>No quiz history yet. Take a quiz to see your results here!</p>
                    ) : (
                        <div className="history-list">
                            {results.map((result) => (
                                <div key={result._id} className="history-item">
                                    <div className="history-info">
                                        <span className="history-date">
                                            {new Date(result.completedAt).toLocaleDateString()}
                                        </span>
                                        <span className="history-score">
                                            Score: {result.percentage}%
                                        </span>
                                        <span className={`history-status ${result.passed ? 'passed' : 'failed'}`}>
                                            {result.passed ? 'PASS' : 'FAIL'}
                                        </span>
                                    </div>
                                    <div className="history-details">
                                        <span>{result.correctAnswers}/{result.totalQuestions} correct</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Profile;
