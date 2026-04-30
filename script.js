let currentQuestion = 0;
let score = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

let selectedQuestions = shuffle([...questions]).slice(0, 30);

function loadQuestion() {
  const q = selectedQuestions[currentQuestion];

  // 📊 CONTATORE
  document.getElementById("progress").innerText =
    "Domanda " + (currentQuestion + 1) + " / " + selectedQuestions.length;

  document.getElementById("question").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;

    btn.onclick = () => checkAnswer(option, btn);

    answersDiv.appendChild(btn);
  });
}

function checkAnswer(selected, clickedButton) {
  const q = selectedQuestions[currentQuestion];
  const buttons = document.querySelectorAll("#answers button");

  buttons.forEach(btn => {
    btn.disabled = true;

    if (btn.innerText === q.correct) {
      btn.style.backgroundColor = "green";
    }

    if (btn === clickedButton && selected !== q.correct) {
      btn.style.backgroundColor = "red";
    }
  });

  if (selected === q.correct) {
    score++;
  }

  setTimeout(() => {
    nextQuestion();
  }, 1000);
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < selectedQuestions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  document.getElementById("quiz-container").innerHTML = "<h2>Esame completato!</h2>";

  let voto = Math.round((score / 30) * 30);

  document.getElementById("score").innerText =
    "Risposte corrette: " + score + "/30 → Voto: " + voto;
}

loadQuestion();
