// Lista de imagens possíveis para o verso das cartas
const imagens = [
    "images/Luffy.jpg",
    "images/Zoro.jpg",
    "images/Sanji.jpg",
    "images/Nami.jpg",
    "images/Robin.jpg",
    "images/Usopp.jpg"
];

const temporizadorElemento = document.getElementById("temporizador");
const limiteDeTempo = 0; // Caso eu for inverter.
const movimentos = document.getElementById("movimentos");

let gameOver = 0;
let segundos = 0;
let minutos = 1;
let finalizado = 0;

// Duplicar as imagens para criar pares (12 cartas no total, portanto 6 pares)
let imagensDuplicadas = [...imagens, ...imagens];

// Função para embaralhar o array usando o algoritmo de Fisher-Yates
function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Embaralhar as imagens duplicadas
embaralharArray(imagensDuplicadas);

// Distribuir as imagens nas cartas
const cartas = document.querySelectorAll(".grid-item");
cartas.forEach((carta, index) => {
    // Atribui uma imagem aleatória do array embaralhado a cada carta
    carta.setAttribute("data-imagem", imagensDuplicadas[index]);
    carta.setAttribute("par-encontrado", "0");
    movimentos.setAttribute("movimentos", 0);
});

// Função para virar a carta e exibir a imagem de trás
function virarCarta(carta) {
    console.log(gameOver);
    if(gameOver == 1){
        return;
    }
    contarMovimentos(carta.getAttribute("par-encontrado"));
    let estadoVirada = carta.getAttribute("data-virada");
    if (estadoVirada === "0") {
        // Se não está virada, vira a carta e mostra a imagem de trás
        carta.setAttribute("data-virada", "1");
        const imagemVerso = carta.getAttribute("data-imagem");
        carta.querySelector("img").src = imagemVerso;
        
        // Verifica se há outra carta virada e se são iguais
        let cartaViradaAnterior = null;

        cartas.forEach((cartaVirada) => {
            if(cartaVirada.getAttribute("par-encontrado") === "0"){
                if (cartaVirada !== carta && cartaVirada.getAttribute("data-virada") === "1") {
                    cartaViradaAnterior = cartaVirada;
                }
            }
        });

        if (cartaViradaAnterior) {
            // Verifica se as cartas são iguais
            if (cartaViradaAnterior.getAttribute("data-imagem") === imagemVerso) {
                cartaViradaAnterior.setAttribute("par-encontrado", "1");
                carta.setAttribute("par-encontrado", "1");
            } else {
                // Se as cartas não combinam, espera alguns segundos antes de virar de volta
                setTimeout(() => {
                    carta.setAttribute("data-virada", "0");
                    carta.querySelector("img").src = "images/caveira.png";
                    cartaViradaAnterior.setAttribute("data-virada", "0");
                    cartaViradaAnterior.querySelector("img").src = "images/caveira.png";
                }, 1000); // 1000ms = 1 segundo de atraso
            }
        }
    }else{ // Deletar caso não acharmos daora poder voltar 
        if(carta.getAttribute("par-encontrado") === "0"){
            carta.setAttribute("data-virada", "0");
            carta.querySelector("img").src = "images/caveira.png";
        }
    }
}

function contarMovimentos(numero) {
    console.log(numero);
    if(numero == 1)
        return;
    let movimentoAux = movimentos.getAttribute("movimentos");
    movimentoAux++;
    movimentos.setAttribute("movimentos", movimentoAux);
    movimentos.textContent = "Movimentos: " + movimentoAux + ".";
}

function atualizarTemporizador() {
    if (minutos === 0 && segundos === 0) {
        temporizadorElemento.textContent = "Tempo Esgotado!";
        clearInterval(intervalo); // Para o temporizador
        gameOver = 1;
        return;
    }

    // Decrementa o tempo
    if (segundos === 0) {
        minutos--;
        segundos = 59;
    } else {
        segundos--;
    }

    let segundosFormatados = segundos < 10 ? `0${segundos}` : segundos;
    let minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
    temporizadorElemento.textContent = `${minutosFormatados}:${segundosFormatados}`;
}

// Inicia o temporizador
const intervalo = setInterval(atualizarTemporizador, 1000);