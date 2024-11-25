const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const overDiv = document.querySelector(".game-status");
const jumpSound = new Audio('audios/jump.mp3');
const gameOverSound = new Audio('audios/game-over.mp3');
const mainMusic = new Audio('audios/main-theme.mp3');
var counterVal = 0;
var body = document.querySelector(".tela-body");

mainMusic.loop = true;

document.addEventListener('keydown', startMainMusic, { once: true });
document.addEventListener('touchstart', startMainMusic, { once: true });

function startMainMusic() {
    mainMusic.play().catch((error) => console.error('Erro ao reproduzir música principal:', error));
}


function jump(){

    jumpSound.currentTime = 0;
    jumpSound.play().catch((error) => console.error('Erro ao reproduzir o som:', error));

    mario.classList.add("jump")

    setTimeout(() => {
        mario.classList.remove("jump")
    } , 500);
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
        } else if (pipePosition <= 40 && pipePosition >= 37 && marioPosition == 140 && marioPosition <= 150){    
            updateDisplay(++counterVal);
        } 
    } else if(document.body.offsetWidth >= 420){
        if (pipePosition <= 85 && pipePosition > 0 && marioPosition < 50){
            gameOverSound.currentTime = 0;
            gameOverSound.play().catch((error) => console.error('Erro ao reproduzir o som:', error));
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
        } else if (pipePosition <= 40 && pipePosition >= 37 && marioPosition == 140 && marioPosition <= 150){    
            updateDisplay(++counterVal);
        }  
    }else{
        if (pipePosition <= 80 && pipePosition > 0 && marioPosition < 50){
            gameOverSound.currentTime = 0;
            gameOverSound.play().catch((error) => console.error('Erro ao reproduzir o som:', error));
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

        } else if (pipePosition <= 40 && pipePosition >= 37 && marioPosition == 140 && marioPosition <= 150){    
            updateDisplay(++counterVal);
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

function updateDisplay(val) {
    document.getElementById("counter-label").innerHTML = val;
}

body.addEventListener('touchstart', jump);

document.addEventListener('keydown', function(event) {
    if (event.key === " ") {
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