import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <section className="home-section">
            <div className="hero">
                <h2>Welcome to Pakistan Driving License Test</h2>
                <p>Practice for your driving license exam with our comprehensive quiz system</p>
                <div className="features">
                    <div className="feature-card">
                        <i className="fas fa-brain"></i>
                        <h3>Smart Learning</h3>
                        <p>Adaptive questions based on Pakistani traffic rules</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-mobile-alt"></i>
                        <h3>Mobile Friendly</h3>
                        <p>Take the test on any device, anywhere</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-clock"></i>
                        <h3>Timed Practice</h3>
                        <p>Real exam conditions with time limits</p>
                    </div>
                </div>
                <button className="cta-button" onClick={() => navigate('/quiz')}>
                    <i className="fas fa-play"></i> Start Quiz Now
                </button>
            </div>
        </section>
    );
};

export default Home;
