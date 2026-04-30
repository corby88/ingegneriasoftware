let currentQuestion = 0;
let score = 0;

// 🔀 Shuffle corretto
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* 🔥 CAMBIA QUI MODALITÀ */
let examMode = false; // 👉 true = esame (30 domande) | false = tutte

let selectedQuestions;

if (examMode) {
  selectedQuestions = shuffle([...questions]).slice(0, 30);
} else {
  selectedQuestions = shuffle([...questions]); // 👉 tutte le domande
}

function loadQuestion() {
  const q = selectedQuestions[currentQuestion];

  document.getElementById("progress").innerText =
    "Domanda " + (currentQuestion + 1) + " / " + selectedQuestions.length;

  document.getElementById("question").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  document.getElementById("nextBtn").style.display = "none";

  const shuffledOptions = shuffle([...q.options]);

  shuffledOptions.forEach(option => {
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

  document.getElementById("nextBtn").style.display = "block";
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
  document.getElementById("quiz-container").innerHTML = "<h2>Quiz completato!</h2>";

  let totale = selectedQuestions.length;
  let voto = Math.round((score / totale) * 30);

  document.getElementById("score").innerText =
    "Risposte corrette: " + score + "/" + totale + " → Voto: " + voto;
}

loadQuestion();
