// Quiz Variables

// Time 
var timeEl = document.querySelector('#time');
var timeLeft = 60;
var timerId;

// Start section
var startBtn = document.querySelector('#start');
var startPage = document.querySelector('#start-page');

// Question & answers 
var quizBox = document.querySelector('#quiz-box');
var questionText = document.querySelector('#question-text');
var choicesEl = document.querySelector('#choices');
var resultEl = document.querySelector('#result')

// User score input
var scoreBox = document.querySelector('#end-page');
var scoreEl = document.querySelector('#score');
var submitScore = document.querySelector('#submit');
var inputEl = document.querySelector('#user-input');

var questions = [
    {
        text: "What does HTML stand for?",
        choices: ["Hypertext Preprocessor", "Hypertext Markup Language", "Hypertext Multiple Language", "Hypertool Multi Language"],
        answers: 1
    },

    {
        text: "What does CSS stand for?",
        choices: ["Common Style Sheet", "Colorful Style Sheet", "Cascading Style Sheet", "Computer Style Sheet"],
        answers: 2

    },

    {
        text: "What is NOT included in data types?",
        choices: ["Strings", "Alerts", "Booleans", "Numbers"],
        answers: 3
    },

    {
        text: "Which of the following is the HTML attribute used when an image does not appear?",
        choices: ["src", "alt", "text", "image"],
        answers: 1
    },

    {
        text: "How do you write a function in JavaScript?",
        choices: ["function myFunction()", "function = myFunction()", "function:myFunction()", "myfunction =()"],
        answers: 0
    }
];

var questionIndex = 0;

// Start Quiz

startBtn.addEventListener('click', function handleStartClick(e) {
    // Hide start page
    startPage.style.display = 'none';

    // Start countdown
    timerId = setInterval(countDown, 1000);

    // Show questions and answers 
    quizBox.style.display = 'block';

    startQuiz();
});

function countDown() {
    // Start Countdown timer for quiz
    timeEl.innerHTML = `Time Remaining: ${timeLeft}`;

    // If timer reaches 0 end quiz
    if (timeLeft < 1) {
        clearTimeout(timerId);

        // Display Score
        displayScore();
    }
    timeLeft--;
};

function startQuiz() {
    var currentQuestion = questions[questionIndex];

    questionText.textContent = currentQuestion.text;

    choicesEl.innerHTML = '';

    //clear prev results
    clearResults();

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choiceBtn = document.createElement('button');

        choiceBtn.setAttribute('class', 'btn');
        choiceBtn.textContent = currentQuestion.choices[i];
        choicesEl.appendChild(choiceBtn);
    };
};

choicesEl.addEventListener('click', function handleChoicesClick(e) {
    e.preventDefault();
    if (!e.target.matches('button'))
    return;

    var userAnswer = e.target.textContent;

    //  current question
    var question = questions[questionIndex];

    //  correct answer
    var correct = question.choices[question.answers];

    //user response
    if (userAnswer === correct) {
        timeLeft += 3;
        resultEl.style.display ="block";
        resultEl.textContent ="Correct!";
    }
    else {
        // If incorrect penalize user by 10 seconds from time, and move to next question.
        timeLeft -= 10;
        resultEl.style.display ="block";
        resultEl.textContent = "Incorrect";
    }

    questionIndex++

    if (questionIndex === questions.length) {
        clearTimeout(timerId);
        return displayScore();
    }

    setTimeout(startQuiz, 1000);
});


function clearResults() {
    resultEl.style.display = 'none';
};

function displayScore() {
    // Hide quiz, reveal results
    quizBox.style.display = 'none';
    timeEl.style.display = 'none';

    // Show score 
    scoreBox.style.display = 'block';

    if (timeLeft < 0) {
        scoreEl.textContent = 'Your score is 0'
    }
    else {
        scoreEl.textContent = `Your score is ${timeLeft}`;
    }

};

submitScore.addEventListener('click', function handleSaveHighscore(e) {
    e.preventDefault();
    // get value of input box
    var initials = inputEl.value.trim();
    if (initials === "") {
        alert('Input cannot be blank!')
        return '';
    }
    else if (initials.length > 3) {
        alert('Initials must be no longer than 3 characters in length!')
        return '';
    }
    // get saved scores from localstorage
    var highscores;
    if (JSON.parse(localStorage.getItem("highscores")) != null)
        highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else
        highscores = [];

    // format new score object for current user
    var score = {
        initials: initials,
        highscore: timeLeft
    };
    highscores.push(score);
    // save to localstorage
    localStorage.setItem("highscores", JSON.stringify(highscores));
    // redirect to next page
    location.href = "highscores.html";

    handleSaveHighscore();
});


