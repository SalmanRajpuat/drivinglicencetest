const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quiz = require('../models/Quiz');

dotenv.config();

// Quiz data from the original project
const quizData = [
    {
        question: "What is the maximum speed limit in urban areas in Pakistan?",
        options: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"],
        correct: 1,
        explanation: "The maximum speed limit in urban areas is 50 km/h according to Pakistani traffic laws.",
        category: "Traffic Rules"
    },
    {
        question: "When approaching a roundabout, which vehicles have the right of way?",
        options: ["Vehicles entering the roundabout", "Vehicles already in the roundabout", "Larger vehicles", "Emergency vehicles only"],
        correct: 1,
        explanation: "Vehicles already in the roundabout have the right of way.",
        category: "Traffic Rules"
    },
    {
        question: "What does a red traffic light mean?",
        options: ["Proceed with caution", "Stop completely", "Slow down", "Yield to oncoming traffic"],
        correct: 1,
        explanation: "A red traffic light means you must stop completely and wait for the green light.",
        category: "Road Signs"
    },
    {
        question: "What is the minimum following distance behind another vehicle?",
        options: ["1 second", "2 seconds", "3 seconds", "5 seconds"],
        correct: 2,
        explanation: "The recommended minimum following distance is 3 seconds under normal conditions.",
        category: "Safety Rules"
    },
    {
        question: "When is it legal to overtake another vehicle?",
        options: ["On curves", "On hills", "When there's clear visibility ahead", "In residential areas only"],
        correct: 2,
        explanation: "Overtaking is only safe and legal when you have clear visibility ahead and sufficient space.",
        category: "Traffic Rules"
    },
    {
        question: "What should you do when you see a school zone sign?",
        options: ["Maintain normal speed", "Reduce speed and be extra cautious", "Sound your horn", "Switch on hazard lights"],
        correct: 1,
        explanation: "In school zones, you must reduce speed and be extra cautious for children's safety.",
        category: "Safety Rules"
    },
    {
        question: "What is the legal blood alcohol limit for drivers in Pakistan?",
        options: ["0.05%", "0.08%", "0.02%", "Zero tolerance"],
        correct: 3,
        explanation: "Pakistan has zero tolerance for alcohol while driving.",
        category: "General"
    },
    {
        question: "When should you use your vehicle's horn?",
        options: ["To greet friends", "When angry at other drivers", "To warn of danger", "In residential areas at night"],
        correct: 2,
        explanation: "Horns should only be used to warn of immediate danger or when necessary for safety.",
        category: "Safety Rules"
    },
    {
        question: "What does a yellow traffic light indicate?",
        options: ["Speed up to cross", "Prepare to stop", "Continue if safe", "Emergency vehicles approaching"],
        correct: 1,
        explanation: "A yellow light means prepare to stop. You should only proceed if stopping would be dangerous.",
        category: "Road Signs"
    },
    {
        question: "What is the maximum speed limit on motorways in Pakistan?",
        options: ["100 km/h", "110 km/h", "120 km/h", "130 km/h"],
        correct: 2,
        explanation: "The maximum speed limit on Pakistani motorways is 120 km/h.",
        category: "Traffic Rules"
    },
    {
        question: "When parking on a hill, which way should you turn your wheels?",
        options: ["Always towards the curb", "Always away from the curb", "Towards the curb when facing downhill", "It doesn't matter"],
        correct: 2,
        explanation: "When facing downhill, turn wheels towards the curb. When facing uphill, turn away from the curb.",
        category: "Safety Rules"
    },
    {
        question: "What should you do if your brakes fail while driving?",
        options: ["Pump the brakes", "Use the handbrake gradually", "Shift to lower gear", "All of the above"],
        correct: 3,
        explanation: "If brakes fail, pump the brakes, use handbrake gradually, and shift to lower gear to slow down.",
        category: "Safety Rules"
    },
    {
        question: "How far before a turn should you signal?",
        options: ["Just before turning", "30 meters before", "100 meters before", "When you feel like it"],
        correct: 2,
        explanation: "You should signal at least 100 meters before making a turn to give other drivers adequate warning.",
        category: "Traffic Rules"
    },
    {
        question: "What does a stop sign require you to do?",
        options: ["Slow down significantly", "Come to a complete stop", "Yield to traffic", "Stop only if cars are coming"],
        correct: 1,
        explanation: "A stop sign requires you to come to a complete stop, regardless of traffic conditions.",
        category: "Road Signs"
    },
    {
        question: "When should you use your hazard lights?",
        options: ["When parking illegally", "During heavy rain", "When your vehicle breaks down", "When driving slowly"],
        correct: 2,
        explanation: "Hazard lights should be used when your vehicle breaks down or creates a traffic hazard.",
        category: "Safety Rules"
    },
    {
        question: "What is the recommended tire tread depth?",
        options: ["1mm", "1.6mm minimum", "3mm", "5mm"],
        correct: 1,
        explanation: "The legal minimum tire tread depth is 1.6mm, but 3mm is recommended for safety.",
        category: "Safety Rules"
    },
    {
        question: "How often should you check your mirrors while driving?",
        options: ["Every 30 seconds", "Every 5-8 seconds", "Only when changing lanes", "Once per trip"],
        correct: 1,
        explanation: "You should check your mirrors every 5-8 seconds to maintain awareness of surrounding traffic.",
        category: "Safety Rules"
    },
    {
        question: "What should you do at a flashing red light?",
        options: ["Treat it as a stop sign", "Proceed with caution", "Speed up to clear the intersection", "Ignore it"],
        correct: 0,
        explanation: "A flashing red light should be treated as a stop sign - come to a complete stop.",
        category: "Road Signs"
    },
    {
        question: "When is it safe to use a mobile phone while driving?",
        options: ["When traffic is slow", "Only for emergencies", "Never, unless hands-free", "At traffic lights"],
        correct: 2,
        explanation: "Mobile phones should only be used hands-free while driving, or not at all for maximum safety.",
        category: "Safety Rules"
    },
    {
        question: "What does defensive driving mean?",
        options: ["Driving aggressively", "Anticipating potential hazards", "Driving very slowly", "Following traffic laws only"],
        correct: 1,
        explanation: "Defensive driving means anticipating potential hazards and being prepared to react safely.",
        category: "General"
    }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/driving-quiz', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');

        // Clear existing questions
        await Quiz.deleteMany({});
        console.log('Existing questions cleared');

        // Insert new questions
        await Quiz.insertMany(quizData);
        console.log(`${quizData.length} questions inserted successfully`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
