const questions = [
  { 
    quest: "Quantos quilos o magrelo pesa?",
    answers: ["55 Kg", "83 Kg", "66 Kg", "60 Kg"],
    correct: "60 Kg"
  }, 
  { 
    quest: "Qual o anime favorito do magrelo?",
    answers: ["Kimetsu no yaiba", "Jujutsu Kaisen", "Hunter x Hunter", "Naruto"],
    correct: "Hunter x Hunter"
  }, 
  { 
    quest: "Qual a coisa que o magrelo mais gosta no mundo",
    answers: ["Cachorros", "Tempo com os amigos", "Linguiça (momolada)", "Vape"],
    correct: "Linguiça (momolada)"
  },
  {
    quest: "Sabendo que o magrelo adora comida apimentada, qual a comida favorita dele?",
    answers: ["Tacos mexicanos","Parmegiana","Sushi","Big mac"],
    correct: "Parmegiana"
  },
  {
    quest: "O magrelo ja jogou como profissional em qual jogo?",
    answers: ["Call of Duty Mobile","Clash Royale","Clash of clans","Fortnite"],
    correct: "Fortnite"
  },
  {
    quest: "Como surgiu a cicatriz no dedo médio da mão direita do magrelo?",
    answers: ["Cortou na quina de uma mesa de vidro",
    "Bateu na parede que nem adolescente com raiva",
    "Brigou na IFMG por que tinha um mano batendo no cachorro",
    "Ele não sabe"],
    correct: "Brigou na IFMG por que tinha um mano batendo no cachorro"
  },
];

let currentQuestion = 0;
let score = 0;

function getQuestion() {
  const questElement = document.getElementById("question");
  const answerElement = document.querySelectorAll(".answer");
  
  questElement.innerText = questions[currentQuestion].quest;
  
  answerElement.forEach((element, index) => {
    element.innerText = questions[currentQuestion].answers[index];
    element.classList.remove("correct", "incorrect");
  });
}

function answerQuestion(selectedElement) {
  const isCorrect = selectedElement.innerText === questions[currentQuestion].correct;
  
  if (isCorrect) {
    selectedElement.classList.add("correct");
    score++;
  } else {
    selectedElement.classList.add("incorrect");
    visualFeedback();
  }
  
  document.getElementById("score").innerText = `Pontuação: ${score}`;
  
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      getQuestion();
    } else {
      gameOver();
    }
  }, 1000);
}

function visualFeedback() {
  const answers = document.querySelectorAll(".answer");
  for(i = 0; i < answers.length;i++)
    if(answers[i].innerText == questions[currentQuestion].correct)
      answers[i].classList.add("correct")
}

function gameOver() {
  document.getElementById("question-container").innerHTML = `<h2>Fim do jogo!</h2>`;
}

getQuestion();
