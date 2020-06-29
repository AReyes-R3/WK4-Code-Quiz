// Variables
const startScreen = document.getElementById('mainBox');
const questionsScreen = document.getElementById('questionsBox');
const quizOverScreen = document.getElementById('quizOverBox');
const totalScoreArea = document.getElementById('totalScore');
const leaderBoardScreen = document.getElementById('leaderBoardBox');
const startBtn = document.getElementById('start-button');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const restartQuizBtn = document.getElementById('restartQuiz');
let timeoutInterval;
const question = document.getElementById("question");
const answerA = document.getElementById("a");
const answerB = document.getElementById("b");
const answerC = document.getElementById("c");
const answerD = document.getElementById("d");
const quizQuestions = [{
    question: "What are the three building blocks of the web?",
    answers: {
      a: "a.  Chrome, Firefox, and Edge",
      b: "b.  Facebook, Twitter and Google",
      c: "c.  HTML, CSS, JavaScript",
      d: "d.  None of the above"
    },
    correctAnswer: "c"
  },
  {
    question: "What is a correct HTML Element Node?",
    answers: {
      a: "a.  Parent Node",
      b: "b.  Child Node",
      c: "c.  Sibling Node",
      d: "d.  All of the above"
    },
    correctAnswer: "d"
  },
  {
    question: "What does DOM stand for?",
    answers: {
      a: "a.  Data Optimization Management",
      b: "b.  Document Object Model",
      c: "c.  Vin Diesel’s nick name",
      d: "d.  None of the above"
    },
    correctAnswer: "b"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "a.  Angular",
      b: "b.  jQuery",
      c: "c.  RequireJS",
      d: "d.  ESLint"
    },
    correctAnswer: "d"
  }
];
let currentQuestion = 0;
let currentCorrectAnswer;
let totalCorrectAnswers = 0;

function timer() {
  const currentTime = document.getElementById('countDownTimer').innerText;

  const timeSplit = currentTime.split(":", 2);

  let minute = timeSplit[0];
  let seconds = calSeconds((timeSplit[1] - 1));
  if (seconds == 59) {
    minute = minute - 1;
  }
  if (minute < 0) {
    clearTimeout(timeoutInterval);
    quizOver();
  }
  document.getElementById('countDownTimer').innerText = minute + ":" + seconds;
  //console.log(minute + ":" + seconds);
  timeoutInterval = setTimeout(timer, 1000);
}

function calSeconds(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec;
  }
  if (sec < 0) {
    sec = "59";
  }
  return sec;
}

function removeFiveSec() {
  const currentTime = document.getElementById('countDownTimer').innerText;
  const timeSplit = currentTime.split(":", 2);
  let minute = timeSplit[0];
  let seconds = calSeconds((timeSplit[1] - 5));
  document.getElementById('countDownTimer').innerText = minute + ":" + seconds;

}

function resetQuiz() {
  document.getElementById('countDownTimer').innerText = "1:00";
  startScreen.style.display = "block";
  questionsScreen.style.display = "none";
  quizOverScreen.style.display = "none";
  leaderBoardScreen.style.display = "none";
}


//Build Quiz Function
function buildQuiz() {
  startScreen.style.display = "none";
  questionsScreen.style.display = "block";
  currentQuestion = 0;
  totalCorrectAnswers = 0;
  loadQuestion();
  timer();
}

function loadQuestion() {
  if (currentQuestion < quizQuestions.length) {
    question.innerHTML = quizQuestions[currentQuestion].question;
    a.innerHTML = quizQuestions[currentQuestion].answers.a;
    a.addEventListener("click", correctAnswer);
    b.innerHTML = quizQuestions[currentQuestion].answers.b;
    b.addEventListener("click", correctAnswer);
    c.innerHTML = quizQuestions[currentQuestion].answers.c;
    c.addEventListener("click", correctAnswer);
    d.innerHTML = quizQuestions[currentQuestion].answers.d;
    d.addEventListener("click", correctAnswer);
    currentCorrectAnswer = quizQuestions[currentQuestion].correctAnswer;
  } else {
    quizOver();
    clearTimeout(timeoutInterval);
  }
}
//Quiz Questions and Answers
function correctAnswer(element) {
  if (element.srcElement.id === currentCorrectAnswer) {
    totalCorrectAnswers++;
  } else {
    removeFiveSec();
  }
  currentQuestion++;
  loadQuestion();
}

//Hide start and question screen, end of quiz and display quiz total 
function quizOver() {
  startScreen.style.display = "none";
  questionsScreen.style.display = "none";
  quizOverScreen.style.display = "block";
  totalScoreArea.innerText = ((totalCorrectAnswers / quizQuestions.length) * 100) + "%";
}

// Store user score (key value pairs /object)
function saveScore() {
  const newScoreEntry = {
    initials: document.getElementById("newScoreInitials").value,
    score: totalScoreArea.innerText
  };
  if (typeof (Storage) !== "undefined") {
    if (localStorage.leaderboard) {
      let savedEntries = JSON.parse(localStorage.leaderboard);
      savedEntries.push(newScoreEntry);
      localStorage.leaderboard = JSON.stringify(savedEntries);
    } else {
      let newLeaderBoard = [];
      newLeaderBoard.push(newScoreEntry);
      localStorage.leaderboard = JSON.stringify(newLeaderBoard);
    }
  }
  // Display leader board High Scores
  displayLeaderBoard();
  document.getElementById("newScoreInitials").value="";
}

function displayLeaderBoard() {
  quizOverScreen.style.display = "none";
  leaderBoardScreen.style.display = "block";
  let scoreRecord = document.getElementById("scoreRecord");
  scoreRecord.innerHTML = "";
  if (typeof (Storage) !== "undefined") {
    if (localStorage.leaderboard) {
      let savedEntries = JSON.parse(localStorage.leaderboard);
      for (let index = 0; index < savedEntries.length; index++) {
        const element = savedEntries[index];
        let newRow = document.createElement("tr");
        let initialsColumn = document.createElement("td");
        initialsColumn.innerText = element.initials;
        newRow.appendChild(initialsColumn);
        let scoreColumn = document.createElement("td");
        scoreColumn.innerText = element.score;
        newRow.appendChild(scoreColumn);
        scoreRecord.appendChild(newRow);
      }
    }
  }
}
// next steps: ,end quiz, store score, add initials and , fix hover 
// Click event listners
startBtn.addEventListener("click", buildQuiz);
saveScoreBtn.addEventListener("click", saveScore);
restartQuizBtn.addEventListener("click", resetQuiz);