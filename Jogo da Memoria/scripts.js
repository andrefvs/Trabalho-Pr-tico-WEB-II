// Lista de imagens possíveis para o verso das cartas
const imagens = [
    "images/Luffy.jpg",
    "images/Zoro.jpg",
    "images/Sanji.jpg",
    "images/Nami.png",
    "images/Robin.jpg",
    "images/Chopper.png"
];

const temporizadorElemento = document.getElementById("temporizador");
const movimentos = document.getElementById("movimentos");

let gameOver = 0;
let segundos = 0;
let minutos = 1;
let cartasViradas = [];
let movimentosContagem = 0;

// Duplicar as imagens para criar pares (12 cartas no total, portanto 6 pares)
let imagensDuplicadas = [...imagens, ...imagens];
embaralharArray(imagensDuplicadas);

// Embaralhar e distribuir as imagens
const cartas = document.querySelectorAll(".grid-item");
cartas.forEach((carta, index) => {
    carta.setAttribute("data-imagem", imagensDuplicadas[index]);
    carta.setAttribute("par-encontrado", "0");
});

// Função para embaralhar o array usando o algoritmo de Fisher-Yates
function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Função para virar a carta
function virarCarta(carta) {
    if (gameOver === 1 || cartasViradas.length >= 2 || carta.getAttribute("data-virada") === "1") {
        return;
    }
    
    carta.setAttribute("data-virada", "1");
    carta.style.backgroundImage = `url(${carta.getAttribute("data-imagem")})`;
    cartasViradas.push(carta);
    contarMovimentos();
    
    if (cartasViradas.length === 2) {
        verificarPar();
    }
}

// Função para verificar se há um par
function verificarPar() {
    const [primeiraCarta, segundaCarta] = cartasViradas;
    
    if (primeiraCarta.getAttribute("data-imagem") === segundaCarta.getAttribute("data-imagem")) {
        primeiraCarta.setAttribute("par-encontrado", "1");
        segundaCarta.setAttribute("par-encontrado", "1");
        cartasViradas = [];
        testaVitoria();
    } else {
        setTimeout(() => {
            primeiraCarta.setAttribute("data-virada", "0");
            primeiraCarta.style.backgroundImage = "url('images/caveira.png')";
            segundaCarta.setAttribute("data-virada", "0");
            segundaCarta.style.backgroundImage = "url('images/caveira.png')";
            cartasViradas = [];
        }, 1000);
    }
}

// Função para contar movimentos
function contarMovimentos() {
    movimentosContagem++;
    movimentos.textContent = "Movimentos: " + movimentosContagem;
}

// Função para atualizar o temporizador
function atualizarTemporizador() {
    if (minutos === 0 && segundos === 0) {
        temporizadorElemento.textContent = "Tempo Esgotado!";
        clearInterval(intervalo);
        gameOver = 1;
        return;
    }

    if (segundos === 0) {
        minutos--;
        segundos = 59;
    } else {
        segundos--;
    }

    temporizadorElemento.textContent = `Tempo: ${minutos < 10 ? "0" : ""}${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
}

// Função para testar vitória
function testaVitoria() {
    const todasEncontradas = Array.from(cartas).every(carta => carta.getAttribute("par-encontrado") === "1");
    if (todasEncontradas) {
        Swal.fire({
            title: "Você venceu!",
            text: "Movimentos: " + movimentosContagem,
            html: "<button class=\"resetar\" onClick=\"location.reload()\">Jogar novamente</button>",
            icon: "success"
          });
        clearInterval(intervalo);
        gameOver = 1;
    }
}

// Inicia o temporizador
const intervalo = setInterval(atualizarTemporizador, 1000);
