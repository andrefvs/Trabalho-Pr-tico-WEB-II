const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const overDiv = document.querySelector(".game-status");
const jumpSound = new Audio('audios/jump.mp3');
const gameOverSound = new Audio('audios/game-over.mp3');
const mainMusic = new Audio('audios/main-theme.mp3');
var counterVal = 0;
var body = document.querySelector(".tela-body");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let survivalInterval;

let pipePassed = false;

let audioEnabled = true;

const audioToggleBtn = document.getElementById("audio-toggle");

document.getElementById("high-score").innerText = highScore;

function updateScore() {
    score++;
    document.getElementById("score").innerText = score;

    if (score > highScore) {
        highScore = score;
        document.getElementById("high-score").innerText = highScore;
        localStorage.setItem("highScore", highScore);
    }
}

mainMusic.loop = true;

document.addEventListener('keydown', startMainMusic, { once: true });
document.addEventListener('touchstart', startMainMusic, { once: true });

function startMainMusic() {
    mainMusic.play().catch((error) => console.error('Erro ao reproduzir música principal:', error));
}


function jump(){
    playSound(jumpSound);
    
    mario.classList.add("jump")

    setTimeout(() => {
        mario.classList.remove("jump")
    } , 500);
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

audioToggleBtn.addEventListener("click", toggleAudio);

function playSound(audio) {
    if (audioEnabled) {
        audio.currentTime = 0;
        audio.play().catch((error) => console.error('Erro ao reproduzir o som:', error));
    }
}

const loop = setInterval(() => {
    
    gameOverSound.currentTime = 0;
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    if(document.body.offsetWidth >= 760){
        if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 80){
            gameOverSound.currentTime = 0;
            gameOverSound.play().catch((error) => console.error('Erro ao reproduzir o som:', error));
            mainMusic.pause();
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;
    
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            mario.src = 'images/game-over.png';
            mario.style.width = '65px';
            mario.style.marginLeft = '35px';
        
    
            clearInterval(loop)
            
            gameOver();
        } 
        if (pipePosition < 0 && !pipePassed) {
            pipePassed = true; 
            updateScore(); 
        }
    
        if (pipePosition > 0) {
            pipePassed = false;
        }
    } else if(document.body.offsetWidth >= 420){
        if (pipePosition <= 85 && pipePosition > 0 && marioPosition < 50){
            playSound(gameOverSound);
            mainMusic.pause();
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;
    
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            mario.src = 'images/game-over.png';
            mario.style.width = '50px';
            mario.style.marginLeft = '35px';

            clearInterval(loop)
            
            gameOver();
        } 
        if (pipePosition < 0 && !pipePassed) {
            pipePassed = true; 
            updateScore(); 
        }
    
        if (pipePosition > 0) {
            pipePassed = false;
        }
    }else{
        if (pipePosition <= 80 && pipePosition > 0 && marioPosition < 50){
            playSound(gameOverSound);
            mainMusic.pause();
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;
    
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            mario.src = 'images/game-over.png';
            mario.style.width = '50px';
            mario.style.marginLeft = '35px';
    
            clearInterval(loop)
            
            gameOver();

        }
        if (pipePosition < 0 && !pipePassed) {
            pipePassed = true;
            updateScore();
        }
    
        
        if (pipePosition > 0) {
            pipePassed = false;
        }
    }
    
}, 10);

function gameOver() {
    overDiv.innerHTML += `<img src="images/overpic.png" alt="imagem game over" class="game-over">
    <button class="buttonStart" onclick="start()">
        <img src="images/start.png" alt="imagem começar jogo" width="150px" class="start">
    </button>`;
}
function start() {
    location.reload();
}

body.addEventListener('touchstart', jump);

document.addEventListener('keydown', function(event) {
    if (event.key === " ") {
        if (document.activeElement === audioToggleBtn) {
            event.preventDefault();
            return;
        }
        jump();
      }
});

document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        start();
      }
});

const inst = document.querySelector(".instrucoes");

let i = 0