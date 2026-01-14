import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <i className="fas fa-car"></i>
                    <h1>Pakistan Driving License Quiz</h1>
                </div>
                <nav className="nav">
                    <Link to="/" className="nav-btn">
                        <i className="fas fa-home"></i> Home
                    </Link>
                    <Link to="/quiz" className="nav-btn">
                        <i className="fas fa-question-circle"></i> Take Quiz
                    </Link>
                    <Link to="/results" className="nav-btn">
                        <i className="fas fa-chart-bar"></i> Results
                    </Link>
                    <Link to="/study" className="nav-btn">
                        <i className="fas fa-book"></i> Study Guide
                    </Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" className="nav-btn">
                                <i className="fas fa-user"></i> Profile
                            </Link>
                            <button onClick={handleLogout} className="nav-btn">
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-btn">
                                <i className="fas fa-sign-in-alt"></i> Login
                            </Link>
                            <Link to="/register" className="nav-btn">
                                <i className="fas fa-user-plus"></i> Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
