const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const overDiv = document.querySelector(".game-status");
const jumpSound = new Audio('audios/jump.wav');
const gameOverSound = new Audio('audios/game-over.wav');
const mainMusic = new Audio('audios/main-theme.mp3');
const startGameButton = document.getElementById('start-game');
const audioToggleBtn = document.getElementById("audio-toggle");
const body = document.querySelector(".tela-body");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let audioEnabled = true;
let gameLoop;
let pipePassed = false;


document.getElementById("high-score").innerText = highScore;

document.body.classList.add('paused');

mainMusic.loop = true;

function startGame() {
 
    document.body.classList.remove('paused');

    const elements = document.querySelectorAll('.pipe, .clouds, .mario');
    elements.forEach((element) => {
        element.style.animationPlayState = 'running';
    });

    startMainMusic();
    startGameButton.style.display = 'none';
    startGameLoop();
}

function startMainMusic() {
    mainMusic.play().catch((error) => console.error('Erro ao reproduzir música principal:', error));
}

function startGameLoop() {
    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (document.body.offsetWidth >= 760) {
            checkCollision(pipePosition, marioPosition, 100, 80);
        } else if (document.body.offsetWidth >= 420) {
            checkCollision(pipePosition, marioPosition, 85, 50);
        } else {
            checkCollision(pipePosition, marioPosition, 80, 50);
        }
    }, 10);
}

function checkCollision(pipePosition, marioPosition, pipeThreshold, marioThreshold) {
    if (pipePosition <= pipeThreshold && pipePosition > 0 && marioPosition < marioThreshold) {
        playSound(gameOverSound);
        mainMusic.pause();

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        mario.src = 'images/game-over.png';
        mario.style.width = '65px';
        mario.style.marginLeft = '35px';

        clearInterval(gameLoop);
        gameOver();
    } else if (pipePosition < 0 && !pipePassed) {
        pipePassed = true;
        updateScore();
    }

    if (pipePosition > 0) {
        pipePassed = false;
    }
}

function gameOver() {
    overDiv.innerHTML += `<img src="images/overpic.png" alt="imagem game over" class="game-over">
    <button class="buttonStart" onclick="restartGame()">
        <img src="images/start.png" alt="imagem começar jogo" width="150px" class="start">
    </button>`;
}

function restartGame() {
    location.reload();
}

function jump() {
    playSound(jumpSound);
    mario.classList.add("jump");

    setTimeout(() => {
        mario.classList.remove("jump");
    }, 500);
}

function updateScore() {
    score++;
    document.getElementById("score").innerText = score;

    if (score > highScore) {
        highScore = score;
        document.getElementById("high-score").innerText = highScore;
        localStorage.setItem("highScore", highScore);
    }
}

function toggleAudio() {
    audioEnabled = !audioEnabled;

    if (audioEnabled) {
        mainMusic.play().catch((error) => console.error('Erro ao reproduzir música principal:', error));
        audioToggleBtn.textContent = "🔊 Som: Ativado";
    } else {
        mainMusic.pause();
        jumpSound.pause();
        gameOverSound.pause();
        audioToggleBtn.textContent = "🔇 Som: Desativado";
    }
}

function playSound(audio) {
    if (audioEnabled) {
        audio.currentTime = 0;
        audio.play().catch((error) => console.error('Erro ao reproduzir o som:', error));
    }
}

startGameButton.addEventListener('click', startGame);
audioToggleBtn.addEventListener("click", toggleAudio);
body.addEventListener('touchstart', jump);
document.addEventListener('keydown', (event) => {
    if (event.key === " ") {
        if (document.activeElement === audioToggleBtn) {
            event.preventDefault();
            return;
        }
        jump();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        restartGame();
    }
});
