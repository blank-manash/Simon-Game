var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function animatePress(currentColor) {

  $('#' + currentColor).addClass('pressed');

  setTimeout(function() {
    $('#' + currentColor).removeClass('pressed');
  }, 100);

}

function checkarray(arr1, arr2, l) {
  for (var i = 0; i < l; i++) {
    if (arr1[i] == arr2[i]) continue;
    else return false;
  }
  return true;
}



function playSound(name) {
  //console.log("Name : "+name);
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function checkAnswer() {
  var l = userClickedPattern.length;
  var k = gamePattern.length;

  console.log("k is " + k + "\nl is " + l);
  console.log("userClickedPattern is " + userClickedPattern);
  console.log("gameSliced : "+gamePattern.slice(0, l));

  if (checkarray(userClickedPattern, gamePattern, l)) {
    if (l == k) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 300);

    }
  } else {
    level = 0;
    $("h1").text("Game Over\nPress any key to play again.");
    gamePattern = [];
    userClickedPattern = [];
  }
}

function nextSequence() {
  randomNumber = Math.ceil(3 * Math.random());

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log("gamePattern : " + gamePattern);

  $("#" + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
  playSound(randomChosenColor);

  if (level == 0) {
    $("h1").text("Level " + level);
  } else {
    $("h1").text("Level " + level);
  }
  level++;
}

function handler(event) {
  var usc = $(event.target).attr("id");
  //console.log("Target : " +usc);
  userClickedPattern.push($(event.target).attr("id"));

  //console.log(userClickedPattern);
  playSound(usc);
  animatePress(usc);
  checkAnswer();

}

$(".btn").click(handler);

$(document).keydown(function(event) {
  /* Act on the event */
  if (level == 0) nextSequence();
});
