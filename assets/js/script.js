// Quiz variables

// Timer
var questionIndex = 0;
var time = questions.length * 15;
var timerId;

var questionsEl = document.getElementById('questions');
var timeEl = document.getElementById('time');
var answersEl = document.getElementById('answers');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('input-initials');
var resultsEl = document.getElementById('result');


function startQuiz() {
    // Hide Start Page
    var startPage = document.getElementById('start-content');
    startPage.setAttribute('class', 'start hide');

    // show questions section
    questionsEl.setAttribute("class", " ");
    // start timer
    timerId = setInterval(function () {
        countDown();
    }, 1000);
    // show starting time
    timerEl.textContent = time;

    getQuestion();
};

function getQuestion() {
    // get current question  from array
    var currentQuestion = questions[questionIndex];
    // update title with current question
    questionsEl.children[0].textContent = currentQuestion.title;
    // clear out any old question answers
    while (answersEl.hasChildNodes()) {
        answersEl.removeChild(answersEl.lastChild);
    }
    // loop answers
    for (var i = 0; i < currentQuestion.answers.length; i++) {

        // create new button for each choice
        var choicesButton = document.createElement("button");
        choicesButton.textContent = currentQuestion.answers[i];

        // display on the page
        answersEl.appendChild(choicesButton);
    }
    // attach click event listener to each choice
    answersEl.children[0].addEventListener("click", function (event) {
        questionClick(answersEl.children[0]);
    });
    answersEl.children[1].addEventListener("click", function (event) {
        questionClick(answersEl.children[1]);
    });
    answersEl.children[2].addEventListener("click", function (event) {
        questionClick(answersEl.children[2]);
    });
    answersEl.children[3].addEventListener("click", function (event) {
        questionClick(answersEl.children[3]);
    });
};

function questionClick(answerChoice) {
    // check answer
    if (answerChoice.textContent != questions[questionIndex].answer) {
        // penalize time if incorrect :(
        time -= 10;
        // display new time on page
        resultsEl.textContent = "Incorrect";

    }
    else {
        resultsEl.textContent = "Correct!";
    }

    // show user if choice is correct/incorrect
    resultsEl.setAttribute("class", "result");
    setInterval(function () {
        resultsEl.setAttribute("class", "result hide");
    }, 700);

    // next question 
    currentQuestionIndex++;

    // number of Q end
    if (currentQuestionIndex === questions.length)
        // endQuiz
        endQuiz();
    // else 
    else
        // getQuestion
        getQuestion();
};

function endQuiz() {
    // stop timer
    clearInterval(timerId);
    timerEl.textContent = time;

    // Show Results
    var endResults = document.getElementById('end-content');
    endResults.setAttribute("class", " ");

    var scoreEl = document.getElementById('final-result');
    scoreEl.textContent = time;

    // hide questions section
    questionsEl.setAttribute("class", "hide");
};

function countDown() {
    // update time
    time--;
    timerEl.textContent = time;

    // check if user ran out of time
    if (time <= 0)
        endQuiz();

};

function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.toUpperCase();
    // make sure value wasn't empty
    if (initials === "") {
        alert("Please enter initials'");
        return;
    }
    else if (initials.length > 3) {
        alert("Initials length must not be longer than 3 characters");
        return;
    }
    else {
        // get saved scores from localstorage, or if not any, set to empty array
        var highscores;
        if (JSON.parse(localStorage.getItem("highscores")) != null)
            highscores = JSON.parse(window.localStorage.getItem("highscores"));
        else
            highscores = [];
        // format new score object for current user
        var newScore = {
            initials: initials,
            score: time
        };
        highscores.push(newScore);
        // save to localstorage
        localStorage.setItem("highscores", JSON.stringify(highscores));
        // redirect to next page
        location.href = "highscore.html";
    };
};

function checkForEnter(event) {
    // check if event key is enter
    // saveHighscore
    if (event.keyCode === 13)
        saveHighscore();
};

submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;