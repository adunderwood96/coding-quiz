var timeEl = document.querySelector('#time');
var timeLeft = 60;
var timerId;

// Start block
var startBtn = document.querySelector('#start');
var startPage = document.querySelector('#start-page');

// Question & answers block
var quizBox = document.querySelector('#quiz-box');
var questionText = document.querySelector('#question-text');
var choicesEl = document.querySelector('#choices');
var resultEl = document.querySelector('#result')

// User score block
var scoreBox = document.querySelector('#end-page');
var scoreEl = document.querySelector('#score');
var submitScore = document.querySelector('#submit');
var inputEl = document.querySelector('#user-input');

var questions = [
    {
        text: "What does HTML stand for?",
        choices: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Text Multiple Language", "Hyper Tool Multi Language"],
        correctAnswer: "Hyper Text Markup Language",
    },

    {
        text: "What does CSS stand for?",
        choices: ["Common Style Sheet", "Colorful Style Sheet", "Computer Style Sheet", "Cascading Style Sheet"],
        correctAnswer: "Cascading Style Sheet",

    },

    {
        text: "What is NOT included in data types?",
        choices: ["Strings", "Alerts", "Booleans", "Numbers"],
        correctAnswer: "Numbers",
    },

    {
        text: "Which of the following is the HTML attribute used when an image does not appear?",
        choices: ["src", "alt", "text", "image"],
        correctAnswer: "alt",
    },

    {
        text: "How do you write a function in JavaScript?",
        choices: ["function myFunction()", "function = myFunction()", "function:myFunction()", "myfunction =()"],
        correctAnswer: "function myFunction()",
    },

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
        // store the answer text
        var answer = currentQuestion.choices[i];
        // Create a button for each answer
        var btn = document.createElement('button');

        btn.setAttribute('class', 'btn');
        // Set the button text to the answers text
        btn.textContent = answer;
        // Append the button to choices
        choicesEl.appendChild(btn);
    };
};

choicesEl.addEventListener('click', function handleChoicesClick(e) {
    e.preventDefault();
    if (!e.target.matches('button')) return;

    var userAnswer = e.target.textContent;

    //  current question
    var question = questions[questionIndex];

    //  correct answer
    var correct = question.choices[question.correctAnswer];

    //user response
    if (userAnswer === correct) {
        displayCorrect();
    }
    else {
        // If incorrect penalize user by 10 seconds from time, and move to next question.
        timeLeft -= 10;
        displayIncorrect();
    }
    questionIndex++

    if (questionIndex === questions.length) {
        clearTimeout(timerId);
        return displayScore();
    }

    setTimeout(startQuiz, 1000);
});

function displayCorrect() {
    // display correct answer div
    resultEl.style.display = 'block';
    resultEl.textContent = 'Correct!';
};

function displayIncorrect() {
    // set attributes for incorrect answers
    resultEl.style.display = 'block';
    resultEl.textContent = 'Incorrect!';
};

function clearResults() {
    resultEl.style.display = 'none';
}

function displayScore() {
    // Hide everything
    quizBox.style.display = 'none';
    timeEl.style.display = 'none';

    // Show score 
    scoreBox.style.display = 'block';

    // Set the text content for the HTML element that displays the score
    if (timeLeft < 0) {
        scoreEl.textContent = 'Your score is 0'
    }
    else {
        scoreEl.textContent = `Your score is ${timeLeft}`;
    }

};

submitScore.addEventListener('click', function handleSaveScore(e) {
    e.preventDefault();
    // get value of input box
    var initials = inputEl.value.trim();
if (initials ===""){
alert('Input cannot be blank!')
}
else if (initials.length > 3){
    alert('Initials length must be no longer than 3 characters')
    return '';
}
      // get saved scores from localstorage, or if not any, set to empty 
      var highscores;
      if(JSON.parse(localStorage.getItem("highscores")) != null)
        highscores = JSON.parse(window.localStorage.getItem("highscores"));
      else
        highscores = [];

      // format new score object for current user
      var newScore = {
        initials: initials,
        score: timeLeft
      };
      highscores.push(newScore);
      // save to localstorage
      localStorage.setItem("highscores", JSON.stringify(highscores));
      // redirect to next page
      location.href = "highscores.html";
}
)