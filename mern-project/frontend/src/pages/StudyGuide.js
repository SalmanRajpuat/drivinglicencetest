import React from 'react';
import './StudyGuide.css';

const StudyGuide = () => {
    return (
        <section className="study-section">
            <div className="study-container">
                <h2>Study Guide - Pakistani Traffic Rules</h2>
                
                <div className="resources-section">
                    <h3><i className="fas fa-external-link-alt"></i> Official Resources & Links</h3>
                    <div className="resource-links">
                        <a href="https://dla.nhmp.gov.pk/" target="_blank" rel="noopener noreferrer" className="resource-link">
                            <i className="fas fa-globe"></i>
                            <div>
                                <strong>NHMP Driving License Authority</strong>
                                <small>Official driving license portal</small>
                            </div>
                        </a>
                        <a href="https://ctplahore.gop.pk/" target="_blank" rel="noopener noreferrer" className="resource-link">
                            <i className="fas fa-building"></i>
                            <div>
                                <strong>City Traffic Police Lahore</strong>
                                <small>Traffic rules and regulations</small>
                            </div>
                        </a>
                        <a href="https://www.nhmp.gov.pk/" target="_blank" rel="noopener noreferrer" className="resource-link">
                            <i className="fas fa-shield-alt"></i>
                            <div>
                                <strong>National Highways & Motorway Police</strong>
                                <small>Highway traffic rules and safety</small>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="study-topics">
                    <div className="topic-card">
                        <h3><i className="fas fa-road"></i> Road Signs</h3>
                        <p>Learn about mandatory, warning, and informatory signs used in Pakistan</p>
                        <ul>
                            <li>Stop signs and their meaning</li>
                            <li>Speed limit signs</li>
                            <li>Warning signs for hazards</li>
                            <li>Direction and information signs</li>
                        </ul>
                    </div>
                    <div className="topic-card">
                        <h3><i className="fas fa-traffic-light"></i> Traffic Rules</h3>
                        <p>Essential traffic regulations and right-of-way rules</p>
                        <ul>
                            <li>Traffic light systems</li>
                            <li>Lane discipline</li>
                            <li>Overtaking rules</li>
                            <li>Speed limits in different areas</li>
                        </ul>
                    </div>
                    <div className="topic-card">
                        <h3><i className="fas fa-exclamation-triangle"></i> Safety Rules</h3>
                        <p>Safety precautions and defensive driving techniques</p>
                        <ul>
                            <li>Seat belt requirements</li>
                            <li>Safe following distance</li>
                            <li>Weather driving conditions</li>
                            <li>Emergency procedures</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudyGuide;
