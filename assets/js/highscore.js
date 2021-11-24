function printHighscores() {

    var highScores = JSON.parse(localStorage.getItem("highscores"));
    if(highScores != null){

      highScores.sort(function(a, b) {
        return parseInt(b.score) - parseInt(a.score);
      });
      // for each score
      for(var i = 0; i < highScores.length; i++){
        // create li tag for score
        var scoreLi = document.createElement("li");
        scoreLi.textContent = highScores[i].initials + " - " + highScores[i].score;
        // display on page
        document.querySelector("#highscores").appendChild(scoreLi);
      }
      
    }
    
  
  function clearHighscores() {
    // (and reload)
    localStorage.removeItem("highscores");
    location.reload();
  }
  
  // attach clear event to clear score button
  var resetBtn = document.querySelector("#reset");
  resetBtn.addEventListener("click", function(){
    clearHighscores();
  })
  // run printhighscore when page loads
  printHighscores();
}