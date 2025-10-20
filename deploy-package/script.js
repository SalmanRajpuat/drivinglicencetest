// Quiz Data - Pakistan Driving License Questions
const quizData = [
    {
        question: "What is the maximum speed limit in urban areas in Pakistan?",
        options: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"],
        correct: 1,
        explanation: "The maximum speed limit in urban areas is 50 km/h according to Pakistani traffic laws."
    },
    {
        question: "When approaching a roundabout, which vehicles have the right of way?",
        options: ["Vehicles entering the roundabout", "Vehicles already in the roundabout", "Larger vehicles", "Emergency vehicles only"],
        correct: 1,
        explanation: "Vehicles already in the roundabout have the right of way."
    },
    {
        question: "What does a red traffic light mean?",
        options: ["Proceed with caution", "Stop completely", "Slow down", "Yield to oncoming traffic"],
        correct: 1,
        explanation: "A red traffic light means you must stop completely and wait for the green light."
    },
    {
        question: "What is the minimum following distance behind another vehicle?",
        options: ["1 second", "2 seconds", "3 seconds", "5 seconds"],
        correct: 2,
        explanation: "The recommended minimum following distance is 3 seconds under normal conditions."
    },
    {
        question: "When is it legal to overtake another vehicle?",
        options: ["On curves", "On hills", "When there's clear visibility ahead", "In residential areas only"],
        correct: 2,
        explanation: "Overtaking is only safe and legal when you have clear visibility ahead and sufficient space."
    },
    {
        question: "What should you do when you see a school zone sign?",
        options: ["Maintain normal speed", "Reduce speed and be extra cautious", "Sound your horn", "Switch on hazard lights"],
        correct: 1,
        explanation: "In school zones, you must reduce speed and be extra cautious for children's safety."
    },
    {
        question: "What is the legal blood alcohol limit for drivers in Pakistan?",
        options: ["0.05%", "0.08%", "0.02%", "Zero tolerance"],
        correct: 3,
        explanation: "Pakistan has zero tolerance for alcohol while driving."
    },
    {
        question: "When should you use your vehicle's horn?",
        options: ["To greet friends", "When angry at other drivers", "To warn of danger", "In residential areas at night"],
        correct: 2,
        explanation: "Horns should only be used to warn of immediate danger or when necessary for safety."
    },
    {
        question: "What does a yellow traffic light indicate?",
        options: ["Speed up to cross", "Prepare to stop", "Continue if safe", "Emergency vehicles approaching"],
        correct: 1,
        explanation: "A yellow light means prepare to stop. You should only proceed if stopping would be dangerous."
    },
    {
        question: "What is the maximum speed limit on motorways in Pakistan?",
        options: ["100 km/h", "110 km/h", "120 km/h", "130 km/h"],
        correct: 2,
        explanation: "The maximum speed limit on Pakistani motorways is 120 km/h."
    },
    {
        question: "When parking on a hill, which way should you turn your wheels?",
        options: ["Always towards the curb", "Always away from the curb", "Towards the curb when facing downhill", "It doesn't matter"],
        correct: 2,
        explanation: "When facing downhill, turn wheels towards the curb. When facing uphill, turn away from the curb."
    },
    {
        question: "What should you do if your brakes fail while driving?",
        options: ["Pump the brakes", "Use the handbrake gradually", "Shift to lower gear", "All of the above"],
        correct: 3,
        explanation: "If brakes fail, pump the brakes, use handbrake gradually, and shift to lower gear to slow down."
    },
    {
        question: "How far before a turn should you signal?",
        options: ["Just before turning", "30 meters before", "100 meters before", "When you feel like it"],
        correct: 2,
        explanation: "You should signal at least 100 meters before making a turn to give other drivers adequate warning."
    },
    {
        question: "What does a stop sign require you to do?",
        options: ["Slow down significantly", "Come to a complete stop", "Yield to traffic", "Stop only if cars are coming"],
        correct: 1,
        explanation: "A stop sign requires you to come to a complete stop, regardless of traffic conditions."
    },
    {
        question: "When should you use your hazard lights?",
        options: ["When parking illegally", "During heavy rain", "When your vehicle breaks down", "When driving slowly"],
        correct: 2,
        explanation: "Hazard lights should be used when your vehicle breaks down or creates a traffic hazard."
    },
    {
        question: "What is the recommended tire tread depth?",
        options: ["1mm", "1.6mm minimum", "3mm", "5mm"],
        correct: 1,
        explanation: "The legal minimum tire tread depth is 1.6mm, but 3mm is recommended for safety."
    },
    {
        question: "How often should you check your mirrors while driving?",
        options: ["Every 30 seconds", "Every 5-8 seconds", "Only when changing lanes", "Once per trip"],
        correct: 1,
        explanation: "You should check your mirrors every 5-8 seconds to maintain awareness of surrounding traffic."
    },
    {
        question: "What should you do at a flashing red light?",
        options: ["Treat it as a stop sign", "Proceed with caution", "Speed up to clear the intersection", "Ignore it"],
        correct: 0,
        explanation: "A flashing red light should be treated as a stop sign - come to a complete stop."
    },
    {
        question: "When is it safe to use a mobile phone while driving?",
        options: ["When traffic is slow", "Only for emergencies", "Never, unless hands-free", "At traffic lights"],
        correct: 2,
        explanation: "Mobile phones should only be used hands-free while driving, or not at all for maximum safety."
    },
    {
        question: "What does defensive driving mean?",
        options: ["Driving aggressively", "Anticipating potential hazards", "Driving very slowly", "Following traffic laws only"],
        correct: 1,
        explanation: "Defensive driving means anticipating potential hazards and being prepared to react safely."
    }
];

// Quiz State
let currentQuestionIndex = 0;
let selectedAnswers = [];
let quizStartTime = null;
let timerInterval = null;
let quizTimeLimit = 15 * 60; // 15 minutes in seconds
let timeRemaining = quizTimeLimit;

// DOM Elements
const sections = document.querySelectorAll('.section');
const navBtns = document.querySelectorAll('.nav-btn');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const timerElement = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');
const resultsContainer = document.getElementById('resultsContainer');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    showSection('home');
});

// Navigation
function showSection(sectionName) {
    // Hide all sections
    sections.forEach(section => section.classList.remove('active'));
    navBtns.forEach(btn => btn.classList.remove('active'));
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    
    // Update active nav button
    const activeBtn = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Quiz Functions
function startQuiz() {
    currentQuestionIndex = 0;
    selectedAnswers = [];
    quizStartTime = new Date();
    timeRemaining = quizTimeLimit;
    
    // Hide start button and show quiz controls
    startBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
    prevBtn.classList.remove('hidden');
    
    // Start timer
    startTimer();
    
    // Load first question
    loadQuestion();
    updateProgress();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Change color when time is running low
    if (timeRemaining <= 60) {
        timerElement.style.color = '#e74c3c';
    } else if (timeRemaining <= 300) {
        timerElement.style.color = '#f39c12';
    } else {
        timerElement.style.color = '#27ae60';
    }
}

function loadQuestion() {
    const question = quizData[currentQuestionIndex];
    questionElement.textContent = question.question;
    
    // Clear previous options
    optionsElement.innerHTML = '';
    
    // Create option elements
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index, optionElement);
        
        // Restore previous selection if exists
        if (selectedAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        
        optionsElement.appendChild(optionElement);
    });
    
    // Update button states
    prevBtn.disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === quizData.length - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

function selectOption(selectedIndex, optionElement) {
    // Remove previous selection
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Add selection to clicked option
    optionElement.classList.add('selected');
    
    // Store the answer
    selectedAnswers[currentQuestionIndex] = selectedIndex;
}

function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        updateProgress();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
        updateProgress();
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
}

function submitQuiz() {
    // Stop timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Calculate results
    const results = calculateResults();
    
    // Show results
    displayResults(results);
    
    // Switch to results section
    showSection('results');
}

function calculateResults() {
    let correctAnswers = 0;
    let totalQuestions = quizData.length;
    const timeElapsed = Math.floor((new Date() - quizStartTime) / 1000);
    
    // Count correct answers
    selectedAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            correctAnswers++;
        }
    });
    
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    return {
        correctAnswers,
        totalQuestions,
        percentage,
        timeElapsed,
        passed: percentage >= 70 // 70% to pass
    };
}

function displayResults(results) {
    const { correctAnswers, totalQuestions, percentage, timeElapsed, passed } = results;
    
    // Determine grade
    let grade, gradeClass, gradeMessage;
    if (percentage >= 85) {
        grade = 'Excellent';
        gradeClass = 'score-excellent';
        gradeMessage = 'Outstanding! You have excellent knowledge of traffic rules.';
    } else if (percentage >= 70) {
        grade = 'Good';
        gradeClass = 'score-good';
        gradeMessage = 'Well done! You passed the test successfully.';
    } else {
        grade = 'Poor';
        gradeClass = 'score-poor';
        gradeMessage = 'You need more practice. Study the traffic rules and try again.';
    }
    
    // Format time
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    resultsContainer.innerHTML = `
        <div class="results-card">
            <h2>Quiz Results</h2>
            <div class="score-circle ${gradeClass}">
                ${percentage}%
            </div>
            <h3>${grade}</h3>
            <p>${gradeMessage}</p>
            
            <div class="results-stats">
                <div class="stat-item">
                    <div class="stat-value">${correctAnswers}/${totalQuestions}</div>
                    <div class="stat-label">Correct Answers</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${percentage}%</div>
                    <div class="stat-label">Score</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${timeString}</div>
                    <div class="stat-label">Time Taken</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${passed ? 'PASS' : 'FAIL'}</div>
                    <div class="stat-label">Result</div>
                </div>
            </div>
            
            <div style="margin-top: 2rem;">
                <button class="btn btn-primary" onclick="reviewAnswers()">
                    <i class="fas fa-eye"></i> Review Answers
                </button>
                <button class="btn btn-success" onclick="retakeQuiz()">
                    <i class="fas fa-redo"></i> Retake Quiz
                </button>
            </div>
        </div>
    `;
}

function reviewAnswers() {
    let reviewHTML = '<div class="results-card"><h2>Answer Review</h2>';
    
    quizData.forEach((question, index) => {
        const userAnswer = selectedAnswers[index];
        const correctAnswer = question.correct;
        const isCorrect = userAnswer === correctAnswer;
        
        reviewHTML += `
            <div style="margin-bottom: 2rem; padding: 1rem; border-left: 4px solid ${isCorrect ? '#28a745' : '#dc3545'}; background: ${isCorrect ? '#d4edda' : '#f8d7da'};">
                <h4>Question ${index + 1}</h4>
                <p><strong>${question.question}</strong></p>
                <p>Your answer: <span style="color: ${isCorrect ? '#155724' : '#721c24'};">${question.options[userAnswer] || 'Not answered'}</span></p>
                ${!isCorrect ? `<p>Correct answer: <span style="color: #155724;">${question.options[correctAnswer]}</span></p>` : ''}
                <p><small><em>${question.explanation}</em></small></p>
            </div>
        `;
    });
    
    reviewHTML += `
        <button class="btn btn-secondary" onclick="displayResults(calculateResults())">
            <i class="fas fa-arrow-left"></i> Back to Results
        </button>
    </div>`;
    
    resultsContainer.innerHTML = reviewHTML;
}

function retakeQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    selectedAnswers = [];
    timeRemaining = quizTimeLimit;
    
    // Reset UI
    startBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    prevBtn.classList.add('hidden');
    submitBtn.classList.add('hidden');
    
    // Clear timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Reset question display
    questionElement.textContent = 'Click "Start Quiz" to begin';
    optionsElement.innerHTML = '';
    progressFill.style.width = '0%';
    progressText.textContent = 'Question 1 of 20';
    timerElement.textContent = '15:00';
    timerElement.style.color = '#27ae60';
    
    // Go to quiz section
    showSection('quiz');
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const activeSection = document.querySelector('.section.active');
    
    if (activeSection && activeSection.id === 'quiz') {
        switch(e.key) {
            case 'ArrowLeft':
                if (!prevBtn.disabled) previousQuestion();
                break;
            case 'ArrowRight':
                if (!nextBtn.classList.contains('hidden')) nextQuestion();
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                const optionIndex = parseInt(e.key) - 1;
                const options = document.querySelectorAll('.option');
                if (options[optionIndex]) {
                    selectOption(optionIndex, options[optionIndex]);
                }
                break;
        }
    }
});

// Prevent accidental page refresh during quiz
window.addEventListener('beforeunload', function(e) {
    if (quizStartTime && !document.querySelector('.results-card')) {
        e.preventDefault();
        e.returnValue = '';
        return 'Are you sure you want to leave? Your quiz progress will be lost.';
    }
});