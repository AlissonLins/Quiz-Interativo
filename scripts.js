const questions = [
    {
      question: "Qual é a capital do Brasil?",
      choices: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
      answer: "Brasília",
    },
    {
      question: "Qual é a capital da Argentina?",
      choices: ["Buenos Aires", "Brasília", "Lisboa", "Paris"],
      answer: "Buenos Aires",
    },
    {
      question: "Qual é a capital da França?",
      choices: ["Roma", "Madri", "Paris", "Londres"],
      answer: "Paris",
    },
    {
      question: "Qual é a capital da Espanha?",
      choices: ["Lisboa", "Madri", "Barcelona", "Valência"],
      answer: "Madri",
    },
    {
      question: "Qual é a capital da Itália?",
      choices: ["Veneza", "Milão", "Roma", "Nápoles"],
      answer: "Roma",
    },
    {
      question: "Quem escreveu 'Dom Quixote'?",
      choices: ["William Shakespeare", "Miguel de Cervantes", "Charles Dickens", "Jane Austen"],
      answer: "Miguel de Cervantes",
    },
    {
      question: "Qual é o maior planeta do Sistema Solar?",
      choices: ["Vênus", "Terra", "Saturno", "Júpiter"],
      answer: "Júpiter",
    },
    {
      question: "Qual é o elemento químico representado pela sigla 'H' ?",
      choices: ["Hélio", "Hidrogênio", "Háfnio", "Hafnio"],
      answer: "Hidrogênio",
    },
    {
        question: "Quem pintou a Mona Lisa?",
        choices: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
        answer: "Leonardo da Vinci",
      },
  ];

  const questionElement = document.querySelector("#question");
  const choiceElement = document.querySelectorAll(".choice");
  const nextButton = document.querySelector("#next");
  const scoreElement = document.querySelector("#score");
  const wrongElement = document.querySelector("#wrong");

  let currentQuestion = 0;
  let score = 0;
  let wrong =  0;
  let answerChosen = false;

  function loadQuestion() {
    const currentQuestionData = questions[currentQuestion]
    questionElement.innerText = currentQuestionData.question;

    const choices = shuffleArray(currentQuestionData.choices);
    
    for(let i = 0; i < choiceElement.length; i++) {
        choiceElement[i].innerText = choices[i]
    }

    answerChosen = false;
}

function shuffleArray(array) {
    let currentIndex = array.length
    let temporaryValue;
    let randomIndex;

    while(0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex-= 1;

        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array;
}

function checkAnswer(e) {
  if(answerChosen) return;

  answerChosen = true;
  
  if(e.target.innerText === questions[currentQuestion].answer){
    score ++;
    scoreElement.innerText = `Pontuação: ${score}`;
    alert("Parabéns! Você acertou a resposta.")
  } else {
    wrong ++;
    wrongElement.innerText = `Erros: ${wrong}`;
    alert(`Errado! A resposta correta é: ${questions[currentQuestion].answer} `);
  }
}

choiceElement.forEach((btn) => {
  btn.addEventListener("click", checkAnswer);
});

nextButton.addEventListener("click",() => {
  if (!answerChosen) {
    alert("Por favor, Responda a pergunta antes de avançar.");
    return
  }
  currentQuestion ++;
  
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    alert(`Fim de jogo! Você acertou ${score} das ${questions.length} perguntas.`);
    restartQuiz()
  }
  
})

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  wrong = 0;
  scoreElement.innerText = `Pontuação: 0`;
  wrongElement.innerText = `Erros: 0`;
  loadQuestion();
}

loadQuestion()