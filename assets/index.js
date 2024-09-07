
const buttonColours = ["red", "green", "yellow", "blue"];

let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keypress(() => {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click((e) => {
    let userChosenColour = $(e.target).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animation(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

const checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        wrongAnswer();
        stratOver();
    }
}


const nextSequence = () => {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

const wrongAnswer = () => {
    let audio = new Audio("sounds/wrong.mp3")
    audio.play();
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
}

const playSound = (color) => {
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

const animation = (curentColor) => {
    document.getElementById(curentColor).classList.add("pressed");
    setTimeout(() => {
        document.getElementById(curentColor).classList.remove("pressed");
    }, 100);
}
const stratOver=()=>{
    level=0;
    gamePattern=[];
    started=false;
}