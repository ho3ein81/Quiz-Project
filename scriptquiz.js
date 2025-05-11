const quizData = [
  {
    question: "پایتخت فرانسه چیست؟",
    a: "برلین",
    b: "مادرید",
    c: "پاریس",
    d: "رم",
    correct: "c"
  },
  {
    question: "نتیجه ۵ × ۳ چیست؟",
    a: "۱۵",
    b: "۸",
    c: "۱۲",
    d: "۲۰",
    correct: "a"
  },
  {
    question: "HTML مخفف چیست؟",
    a: "Hyper Text Markup Language",
    b: "Home Tool Markup Language",
    c: "Hyperlinks and Text Markup Language",
    d: "None",
    correct: "a"
  }
];

// 🔀 چیدمان تصادفی سوالات
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(quizData);

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const timerEl = document.getElementById('timer');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.innerText = `زمان: ${timeLeft} ثانیه`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `زمان: ${timeLeft} ثانیه`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoNext();
    }
  }, 1000);
}

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
  startTimer();
}

function deselectAnswers() {
  answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
  let answer;
  answerEls.forEach(answerEl => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function autoNext() {
  const selected = getSelected();
  if (selected === quizData[currentQuiz].correct) {
    score++;
  }
  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
}

submitBtn.addEventListener('click', () => {
  clearInterval(timer);
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      showResult();
    }
  }
});

function showResult() {
  if (score === quizData.length) {
    document.body.style.backgroundColor = "#a7f3d0"; // سبز کم‌رنگ
    quiz.innerHTML = `
      <h2>🎉 تبریک! شما به تمام سوالات درست پاسخ دادید!</h2>
      <button onclick="location.reload()">شروع مجدد</button>
    `;
  } else {
    quiz.innerHTML = `
      <h2>شما به ${score} از ${quizData.length} سوال درست پاسخ دادید.</h2>
      <button onclick="location.reload()">شروع مجدد</button>
    `;
  }
}

// ⏱ شروع اولیه
loadQuiz();


