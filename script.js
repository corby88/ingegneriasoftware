let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(option);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === questions[currentQuestion].correct) {
    score++;
  }
  nextQuestion();
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz-container").innerHTML = "<h2>Quiz completato!</h2>";
    document.getElementById("score").innerText = "Punteggio: " + score + "/" + questions.length;
  }
}

loadQuestion();
