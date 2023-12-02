var gamePattern = [];
var userPattern = [];
var level = 0;
var currentLevel = 0;

function nextSequence() {
    level++;
    if(level !== 0){
        $("#level-title").text("Level " + level);
        $(document).off("keydown", nextSequence);
    }
    var randomNumber = Math.floor(Math.random() * 4);
    var buttonColors = ["red", "blue", "green", "yellow"];
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    userPattern = [];
    currentLevel = 0;
    sequenceAnimation(randomColor);
    buttonSound(randomColor);
}

console.log(gamePattern);

function sequenceAnimation(randomButton) {
    $("#" + randomButton).fadeOut(100).fadeIn(100);
}

function buttonAnimation(selectedColor){
    $("#"+selectedColor).addClass("pressed");
    console.log("sounds/" + selectedColor + ".mp3");
    setTimeout(function(){
        $("#"+selectedColor).removeClass("pressed");
    }, 100);
}


$(document).on("keydown", nextSequence)


function buttonSound(selected) {
    var audio = new Audio("sounds/" + selected + ".mp3");
    audio.play();
}


$(".btn").click(function(){
    var buttonClicked = this.getAttribute("id");
    buttonAnimation(buttonClicked);
    buttonSound(buttonClicked);
    userPattern.push(buttonClicked);
    userPick(userPattern, gamePattern);
});


function userPick(userPattern, gamePattern) {
    if(gamePattern[currentLevel] === userPattern[currentLevel]){
        // console.log("You are going right!" + gamePattern.slice(0, lengthUser));
        currentLevel++;
        if(currentLevel === gamePattern.length){
            // console.log(currentLevel + "vs" + gamePattern.length);
            setTimeout(nextSequence, 500);
        }
    }

    else{
        // console.log("Man, you suck! " + gamePattern.slice(0, lengthUser));
        // console.log("User got " + userPattern);
        gameOver();
    }
}

function gameOver() {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    var wrongButton = new Audio("sounds/wrong.mp3");
    wrongButton.play();
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 300);
    
}