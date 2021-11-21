// Quiz Variables

// Timer
var timeEl = document.querySelector('time');
var timeLeft = 90;
var timerId;

// Start Page
var startPrompt = document.querySelector('start-content');
var startBtn = document.querySelector('start-btn');

// Question, answers, and results Block
var quizPage = document.querySelector('quiz-page');
var questions = document.querySelector('questions');
var answerDiv = document.querySelector('answers');
var resultDiv = document.querySelector('result');

// User end score result 
var endResults = document.querySelector('end-content');
var resultDiv = document.querySelector('final-result');
var initialsDiv = document.querySelector('input-initials');
var initials = document.querySelector("initials");
var submitScore = document.querySelector('submit');

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

var questionIndex = 0;

// event handlers
startBtn.addEventListener('click', handleStartClick);
answerDiv.addEventListener('click', handleAnswerClick);
submitScore.addEventListener('click', handleSubmitClick);
rePlay.addEventListener('click', handleReplayClick);
clearScore.addEventListener('click', handleClearClick);


// Functions
function handleStartClick(e) {
    // Hide start screen 
    startPrompt.style.display = 'none';

    // Start counter count down
    timerId = setInterval(countDown, 1000);

    // Show questions and answers 
    quizPage.style.display = 'block';

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

function startQuiz() {
    var currentQuestion = questions[questionIndex];

    questions.textContent = currentQuestion.text;

    answerDiv.innerHTML = '';

    clearResults();

    for (let i = 0; i < currentQuestion.answers.length; i++) {
        // Create a variable to store the answer text
        var answer = currentQuestion.answers[i];
        // Create a button for each answer
        var btn = document.createElement('button');
        // Set the button class='btn btn-primary btn-color'
        btn.setAttribute('class', 'btn');
        // Set the button text to the answers text
        btn.textContent = answer;
        // Append the button to the answers div
        answerDiv.appendChild(btn);
    };
};

function handleAnswerClick(e) {
    e.preventDefault();
    if (!e.target.matches('button')) return;

    // Did the user chose the correct answer?
    // Store the user's answer
    var userAnswer = e.target.textContent;

    // Retrieve current question
    var question = questions[questionIndex];

    // Get correct answer
    var correctAnswer = question.answers[question.correctIndex];

    // Compare correct answer to user's response
    if (userAnswer === correctAnswer) {
        displayCorrect();
    }
    else {
        // If incorrect, indicate, remove 10 seconds from time, move to next question.
        timeLeft -= 10;
        displayIncorrect();
    }
    questionIndex++

    if (questionIndex === questions.length) {
        clearTimeout(timeTick);
        return displayScore();
    }

    setTimeout(startQuiz, 1000);
};

function displayCorrect() {
    // display correct answer div
    resultDiv.style.display = 'block';
    resultDiv.textContent = 'Correct!';
};

function displayIncorrect() {
    // set attributes for incorrect answers
    resultDiv.style.display = 'block';
    resultDiv.textContent = 'Incorrect!';
};

function clearResults() {
    resultDiv.style.display = 'none';
}
