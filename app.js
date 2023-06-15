var keyPressed;
var enableButton = false;
document.addEventListener("keydown", function (event) {
    if (enableButton) {
        if (event.keyCode == 37) {
            keyPressed = "left";
        } else if (event.keyCode == 39) {
            keyPressed = "right";
        }
        movePlayer();
    }
});

var player = document.getElementById("player");
var playerIsOn;

function movePlayer() {
    playerIsOn = player.style.left;
    if (playerIsOn === "183.2px" && keyPressed === "left") {
        player.style.left = "51px";
        playerIsOn = "51px";
    } else if (playerIsOn === "51px" && keyPressed === "right") {
        player.style.left = "183.2px";
        playerIsOn = "183.2px";
    } else if (playerIsOn === "183.2px" && keyPressed === "right") {
        player.style.left = "317.5px";
        playerIsOn = "317.5px";
    } else if (playerIsOn === "317.5px" && keyPressed === "left") {
        player.style.left = "183.2px";
        playerIsOn = "183.2px";
    }
}

var enemy;
function createEnemy() {
    enemy = document.createElement('div');
    enemy.classList.add('enemy');
    return enemy;
}

var crashed = false;
function moveEnemy(enemy) {
    var position = 339;
    var interval = setInterval(function () {
        if (position <= -60) {
            clearInterval(interval);
            enemy.remove();
        } else {
            position--;
            enemy.style.bottom = position + "px";
        }
        if (isColliding(player, enemy)) { // Check collision between player and enemy
            crashed = true;
            isGameOver(crashed);
        }
        // console.log(score)
    }, 10);
}

function isColliding(element1, element2) {
    var rect1 = element1.getBoundingClientRect();
    var rect2 = element2.getBoundingClientRect();

    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}

function generateRandomPosition() {
    var positionOnLane = Math.ceil(Math.random() * 3);
    if (positionOnLane === 1) {
        return "51px";
    } else if (positionOnLane === 2) {
        return "183.2px";
    } else {
        return "317.5px";
    }
}

var score = 0;
var gameBox = document.getElementById("game-box");
var displayScore = document.getElementById("display-score");
var enemies = [];
var randomPosition;
var gameBeingPlayed;

function startAnimation() {
    gameBeingPlayed = setInterval(function () {
        var enemy = createEnemy();
        enemies.push(enemy);
        randomPosition = generateRandomPosition();
        enemy.style.left = randomPosition;
        gameBox.appendChild(enemy);
        moveEnemy(enemy);
        score++
        displayScore.innerText = score;
    }, 2000);
}

var tryAgainButton = document.getElementById("try-again-button").addEventListener("click", redirectToStart);
var tryAgainScreen = document.getElementById("try-again-screen");
var finalScore = document.getElementById("final-score");

function isGameOver(crashed) {
    if (crashed) {
        tryAgainScreen.style.display = "flex"
        enableButton = false;
        player.style.left = "183.2px";
        playerIsOn = ""
        clearInterval(gameBeingPlayed);
        finalScore.innerText = score;
        score = 0;
        displayScore.innerText = "xxx"
        enemies.forEach(function (enemy) {
            enemy.remove();
        });
        enemies = [];
    }
}

var startButton = document.getElementById("start-button").addEventListener("click", startGame);
var startScreen = document.getElementById("start-screen");

function startGame() {
    startScreen.style.display = "none";
    enableButton = true;
    startAnimation();
}

function redirectToStart() {
    startScreen.style.display = "flex";
    tryAgainScreen.style.display = "none";
}
