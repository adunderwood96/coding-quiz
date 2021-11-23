const timeEl = document.querySelector('#time');
let timeLeft = 90;
let timerId;

// Start block
const startBtn = document.querySelector('#start');
const startPage = document.querySelector('#start-page');

// Question & answers block
const questionsEl = document.querySelector('#questions');
const questionText = document.querySelector('#question-text');
const choicesEl = document.querySelector('#choices');
const resultEl = document.querySelector('#result')

// User score block
const scoreBox = document.querySelector('#end-page');
const scoreEl = document.querySelector('#score');
const submitScore = document.querySelector('#submit');
const inputEl = document.querySelector('#input');
const initials = document.querySelector("#initials");

const questions = [
    {
        text: "What does HTML stand for?",
        choices: [
            "Hyper Text Preprocessor",
            "Hyper Text Markup Language",
            "Hyper Text Multiple Language",
            "Hyper Tool Multi Language",
        ],
        answer: "Hyper Text Markup Language"

    },

    {
        text: "What does CSS stand for?",
        choices: [
            "Common Style Sheet",
            "Colorful Style Sheet",
            "Computer Style Sheet",
            "Cascading Style Sheet",
        ],
        answer: "Cascading Style Sheet"

    },

    {
        text: "What is NOT included in data types?",
        choices: [
            "Strings",
            "Alerts",
            "Booleans",
            "indexNumberers",
        ],
        answer: "alerts"
    },

    {
        text: "Which of the following is the HTML attribute used when an image does not appear?",
        choices: [
            "src",
            "alt",
            "text",
            "image",
        ],
        answer: "alt"
    },

    {
        text: "How do you write a function in JavaScript?",
        choices: [
            "function myFunction()",
            "function = myFunction()",
            "function:myFunction()",
            "myfunction =()",
        ],
        answer: "function myFunction()"
    },

    {
        text: "What is the largest HTML element for headings?",
        choices: [
            "<heading>",
            "<h6>",
            "<h1>",
            "<head>",
        ],
        answer: "<h1>"
    },

    {
        text: "What is the correct way to add a line break into HTML?",
        choices: [
            "<br>",
            "<break>",
            "<lb>",
            "<line>",
        ],
        answer: "<br>"
    },

    {
        text: "What is the proper way to add a comment in JS?",
        choices: [
            "--!comment--",
            "'comment'",
            "!comment",
            "// comment",
        ],
        answer: "// comment"
    },

    {
        text: "What is the largest HTML element for headings?",
        choices: [
            "<heading>",
            "<h6>",
            "<h1>",
            "<head>",
        ],
        answer: "<h1>"
    },

    {
        text: "In CSS how do you select an id element?",
        choices: [
            ".id",
            "!id",
            "id",
            "*id",
        ],
        answer: "id"
    },
];

let questionIndex = 0;

// Event Listeners 
startBtn.addEventListener('click', startClick);
choicesEl.addEventListener('click', choicesClick);
submitScore.addEventListener('click', submitClick);
clearScore.addEventListener('click', clearClick);

function startClick(e) {
    // Hide start page
    startPage.style.display = 'none';

    // Start countdown
    timerId = setInterval(countDown, 1000);

    // Show questions and answers 
    questionsEl.style.display = 'block';

    startQuiz();
};

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
    const currentQuestion = questions[questionIndex];

    questionText.textContent = currentQuestion.text;

    choicesEl.innerHTML = '';

    //clear prev results
    clearResults();

    for (let i = 0; i < currentQuestion.choices.length; i++) {
        // Create a variable to store the answer text
        const answer = currentQuestion.choices[i];
        // Create a button for each answer
        const btn = document.createElement('button');

        btn.setAttribute('class', 'btn');
        // Set the button text to the answers text
        btn.textContent = answer;
        // Append the button to the answers div
        choicesEl.appendChild(btn);
    };
};

function choicesClick(e) {
    e.preventDefault();
    if (!e.target.matches('button')) return;

    // Did the user chose the correct answer?
    // Store the user's answer
    const userAnswer = e.target.textContent;

    // Retrieve current question
    const question = questions[questionIndex];

    // Get correct answer
    const correctAnswer = question.choices[question.answer];

    // Compare correct answer to user's response
    if (userAnswer === correctAnswer) {
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
};

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
    questions.style.display = 'none';
    timeEl.style.display = 'none';

    // Show score block
    scoreBox.style.display = 'block';

    // Set the text content for the HTML element that displays the score
    if (timeLeft < 0) {
        scoreEl.textContent = 'Your score is 0'
    }
    else {
    scoreEl.textContent = `Your score is ${timeLeft}`;
    }
    

};

function submitClick(e) {
  e.preventDefault();
  // Allow user to record score
    var user = {
        initials: initials.value.trim(),
        score: timeLeft,
    };

    
    var scores = JSON.parse(localStorage.getItem('highscores')) || [];
    scores.push(user);

    // Create user on local storage 
    localStorage.setItem('highscores', JSON.stringify(scores));

    renderHighScore(user);
    
    // Save initials and score to localStorage

  };

  function renderHighScore(user) {
    // Hide score section
    scoreBox.style.display = 'none';
  
    // Show high score block
    hscoreBox.style.display = 'block';
    
    // Display user's initial and score
    highscoreEl.textContent = user.initials + ': ' + user.score;
    
      var highScoreList = localStorage.getItem('highscores');
      highScoreList = JSON.parse(highScoreList);

      };
  

  
      function clearClick() {
          // Clear score
          highscoreEl.textContent = '';
      }