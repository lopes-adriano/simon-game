var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").click(function (event) {
  var userChosenColor = this.id;
  if(started){
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length);
  }
});

$(document).keypress(function(){
    if (!started) {
        setTimeout(nextSequence(), 200);
        started = true;
        $("#level-title").html("Level "+level);
      }
})

function nextSequence() {
    userClickedPattern = [];
  level += 1;
  $("#level-title").html("Level "+level);
  var next = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[next];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel - 1] === userClickedPattern[currentLevel - 1]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){nextSequence()},1000);
        }
    }else{
        $("#level-title").html("Game Over");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {$("body").removeClass("game-over");}, 200);
        setTimeout(() => {startOver()}, 2000);
    }
}

function startOver(){
    gamePattern = [];
    started = false;
    level = 0;
    $("#level-title").html("Press A Key to Start");
}

function playSound(name) {
  $("#" + name).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
