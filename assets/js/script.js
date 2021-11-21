// Quiz Variables

// Timer
var timeEl = document.querySelector('#time');
var timeLeft = 60;
var timerId;

// Start Page
var startBtn = document.querySelector('#start-btn');
var startPrompt = document.querySelector('#start-content');

// Question, answers, and results Block
var questionContainer = document.querySelector('#quiz-page');
var questions = document.querySelector('#questions');
var answerDiv = document.querySelector('#answers');
var resultDiv = document.querySelector('#result');

// User end score result 
var scoreContainer = document.querySelector('#end-content');
var scoreDiv = document.querySelector('#final-result');
var recordScore = document.querySelector('#submit');
var initialsDiv = document.querySelector('#input-initials');
var initials = document.querySelector("#initials");

// High score Page
var highScoreDiv = document.querySelector('#high-score');
var hScoreContainer = document.querySelector('#hscore-container');
var rePlay = document.querySelector('#play-again');
var clearScore = document.querySelector('#clear');

// Questions/Answers Array
var questions = [
    {
        numb: 1,
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: [
            "Hyper Text Preprocessor",
            "Hyper Text Markup Language",
            "Hyper Text Multiple Language",
            "Hyper Tool Multi Language"
        ]
    },
    {
        numb: 2,
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheet",
        options: [
            "Common Style Sheet",
            "Colorful Style Sheet",
            "Computer Style Sheet",
            "Cascading Style Sheet"
        ]
    },
    {
        numb: 3,
        question: "What is NOT included in data types?",
        answer: "alerts",
        options: [
            "Strings",
            "Alerts",
            "Booleans",
            "Numbers",
        ]
    },
    {
        numb: 4,
        question: "Which of the following is the HTML attribute used when an image does not appear?",
        answer: "alt",
        options: [
            "src",
            "alt",
            "title",
            "image",
        ]
    },
    {
        numb: 5,
        question: "How do you write a function in JavaScript?",
        answer: "function myFunction()",
        options: [
            "function myFunction()",
            "function = myFunction()",
            "function:myFunction()",
            "myfunction =()",
        ]
    },

    {
        numb: 6,
        question: "What is the largest HTML element for headings?",
        answer: "<h1>",
        options: [
            "<heading>",
            "<h6>",
            "<h1>",
            "<head>",
        ]
    },

    {
        numb: 7,
        question: "What is the correct way to add a line break into HTML?",
        answer: "<br>",
        options: [
            "<br>",
            "<break>",
            "<lb>",
            "<line>",
        ]
    },

    {
        numb: 8,
        question: "What is the proper way to add a comment in JS?",
        answer: "// comment",
        options: [
            "--!comment--",
            "'comment'",
            "!comment",
            "// comment",
        ]
    },

    {
        numb: 9,
        question: "What is the largest HTML element for headings?",
        answer: "<h1>",
        options: [
            "<heading>",
            "<h6>",
            "<h1>",
            "<head>",
        ]
    },

    {
        numb: 10,
        question: "In CSS how do you select an id element?",
        answer: "#id",
        options: [
            ".id",
            "!id",
            "#id",
            "*id",
        ]
    },
];

// Show num of questions
var questionIndex = 0;

// event handlers
startBtn.addEventListener('click', handleStartClick);
answerDiv.addEventListener('click', handleAnswerClick);
recordScore.addEventListener('click', handleSubmitClick);
rePlay.addEventListener('click', handleReplayClick);
clearScore.addEventListener('click', handleClearClick);


// Functions
function handleStartClick() {
    // Hide start prompt
    startPrompt.style.display = 'none';

    // Start counter count down; use setInterval to determine what happens each second
    timerId = setInterval(countDown, 1000);

    // Show questions and answers 
    questionContainer.style.display = 'block';
    
    startQuiz();
};


function countDown() {
    // Display timer & start countdown
    timeEl.innerHTML = `Time: ${timeLeft}`;
    // Stop quiz
    if (timeLeft < 1) {
        clearTimeout(timerId);

        // Display score block
        displayScore();
    }
    timeLeft--;
};

