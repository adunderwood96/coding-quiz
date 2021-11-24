function printHighscores() {

  var highscores = JSON.parse(localStorage.getItem("highscores"));

    // for each score
    for (var i = 0; i < highscores.length; i++) {
      // create list for score
      var scoreLi = document.createElement("li");
      scoreLi.textContent = highscores[i].initials + " - " + highscores[i].highscore;
      // display on page
      document.getElementById("highscores").appendChild(scoreLi);
    }
  }


  function clearHighscores() {
    // (and reload)
    localStorage.removeItem("highscores");
    location.reload();
  }

  // attach clear event to clear score button
  var resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", function () {
    clearHighscores();
  })
  // run printhighscore when page loads
  printHighscores();