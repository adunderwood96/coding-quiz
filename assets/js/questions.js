// Questions/answer Array
var questions = [
    {
        title: "What does HTML stand for?",
        choices: [
            "Hyper Text Preprocessor",
            "Hyper Text Markup Language",
            "Hyper Text Multiple Language",
            "Hyper Tool Multi Language",
        ],
        answer: "Hyper Text Markup Language"

    },

    {
        title: "What does CSS stand for?",
        choices: [
            "Common Style Sheet",
            "Colorful Style Sheet",
            "Computer Style Sheet",
            "Cascading Style Sheet",
        ],
        answer: "Cascading Style Sheet"
    
    },

    {
        title: "What is NOT included in data types?",
        choices: [
            "Strings",
            "Alerts",
            "Booleans",
            "indexNumberers",
        ],
        answer: "alerts"
    },

    {
        title: "Which of the following is the HTML attribute used when an image does not appear?",
        choices: [
            "src",
            "alt",
            "title",
            "image",
        ],
        answer: "alt"
    },

    {
        title: "How do you write a function in JavaScript?",
        choices: [
            "function myFunction()",
            "function = myFunction()",
            "function:myFunction()",
            "myfunction =()",
        ],
        answer: "function myFunction()"
    },

    {
        title: "What is the largest HTML element for headings?",
        choices: [
            "<heading>",
            "<h6>",
            "<h1>",
            "<head>",
        ],
        answer: "<h1>"
    },

    {
        title: "What is the correct way to add a line break into HTML?",
        choices: [
            "<br>",
            "<break>",
            "<lb>",
            "<line>",
        ],
        answer: "<br>"
    },

    {
        title: "What is the proper way to add a comment in JS?",
        choices: [
            "--!comment--",
            "'comment'",
            "!comment",
            "// comment",
        ],
        answer: "// comment"     
    },

    {
        title: "What is the largest HTML element for headings?",
        choices: [
            "<heading>",
            "<h6>",
            "<h1>",
            "<head>",
        ],
        answer: "<h1>"   
    },

    {
        title: "In CSS how do you select an id element?",
        choices: [
            ".id",
            "!id",
            "id",
            "*id",
        ],
        answer: "id"
    },
];

// Quiz variables

// Timer
var questionIndex = 0;
var time = questions.length * 15;
var timerId;

var questionsEl = document.getElementById('questions');
var timeEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
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
    // clear out any old question choices
    while (choicesEl.hasChildNodes()) {
        choicesEl.removeChild(choicesEl.lastChild);
    }
    // loop choices
    for (var i = 0; i < currentQuestion.choices.length; i++) {

        // create new button for each choice
        var choicesButton = document.createElement("button");
        choicesButton.textContent = currentQuestion.choices[i];

        // display on the page
        choicesEl.appendChild(choicesButton);
    }
    // attach click event listener to each choice
    choicesEl.children[0].addEventListener("click", function (event) {
        questionClick(choicesEl.children[0]);
    });
    choicesEl.children[1].addEventListener("click", function (event) {
        questionClick(choicesEl.children[1]);
    });
    choicesEl.children[2].addEventListener("click", function (event) {
        questionClick(choicesEl.children[2]);
    });
    choicesEl.children[3].addEventListener("click", function (event) {
        questionClick(choicesEl.children[3]);
    });
}

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
    }, 600);

    // next question 
    questionIndex++;

    // number of Q end
    if (questionIndex === questions.length)
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
