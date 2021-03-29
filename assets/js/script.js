var index = 0;
var timeLeft = 60;
var questionBodyEl = document.querySelector(".question-body");
var countdownEl = document.getElementById("countdown");
var highScoreEl = document.querySelector(".highscores-btn");
var submitInitialsEl = document.querySelector(".btn submit-btn");
var containerEl = document.querySelector(".container");
localStorage.setItem("page_html", containerEl.innerHTML);

// if local storage has an item name users it sets the array with that info else empty
var users = JSON.parse(localStorage.getItem("users")) || [];

// initializing my setTimer variables globaly so i can clear them later
var countDown;
var delayNextQuestion;

function startTimer() {
  countDown = setInterval(function () {
    if (timeLeft > 0) {
      countdownEl.innerText = "TIME: " + timeLeft;
      timeLeft--;
    } else if (timeLeft === 0) {
      //call a function that the quiz is over and display the score
      countdownEl.innerText = "TIME: 0";
      endQuiz();
    }
  }, 1000);
}

function createQuestion(questIndex) {
  if (questIndex === questions.length) {
    endQuiz();
  } else {
    //clear the existiing content
    questionBodyEl.innerHTML = "";

    //create the question head
    var questionHeadEl = document.createElement("h2");
    questionHeadEl.className = "question-head";
    questionHeadEl.textContent = questions[index].question;
    questionBodyEl.appendChild(questionHeadEl);

    // create the answer options for the question based on the index
    var answers = questions[questIndex].answers;
    for (var i = 0; i < answers.length; i++) {
      var buttonEl = document.createElement("button");
      buttonEl.className = "btn question-btn";
      buttonEl.setAttribute("index", questIndex);
      buttonEl.textContent = questions[questIndex].answers[i];
      questionBodyEl.appendChild(buttonEl);
    }
    index++;
  }
}

//displays correct if a true value is passed and wrong if a false value is passed
function displayAnswer(bool) {
  var lineEl = document.createElement("hr");
  lineEl.className = "line";
  questionBodyEl.appendChild(lineEl);

  var textEl = document.createElement("p");
  textEl.className = "result-text";

  if (bool === true) {
    textEl.innerHTML = "CORRECT";
  } else if (bool === false) {
    textEl.innerHTML = "WRONG";
  }
  questionBodyEl.appendChild(textEl);
}

function timerHandle(a) {
  if (a === 10) {
    timeLeft += 10;
  } else if (a === -10) {
    if (timeLeft > 10) {
      timeLeft -= 10;
    } else {
      endQuiz();
    }
  }
}

function checkAnswer(button) {
  var buttonText = button.textContent;
  if (buttonText === questions[index - 1].correctAnswer) {
    timerHandle(10);
    displayAnswer(true);
  } else {
    timerHandle(-10);
    displayAnswer(false);
  }
}

function buttonHandler(event) {
  //if the start button is clicked it does not check if the answer is correct

  if (event.target.matches(".start-btn")) {
    createQuestion(index);
    startTimer();

    // if the event.target matches the classname .question then the user clicked the button
  } else if (event.target.matches(".question-btn")) {
    checkAnswer(event.target);
    //delay the next answer for 1s
    delayNextQuestion = setTimeout(function () {
      createQuestion(index);
    }, 1200);
  }
}

function endQuiz() {
  //clearing the setTimeouts so they dont interfiar with the logic
  clearInterval(countDown);
  clearInterval(delayNextQuestion);
  //clear the existiing content
  questionBodyEl.innerHTML = "";
  countdownEl.innerText = "TIME: 0";

  var questionHeadEl = document.createElement("h2");
  questionHeadEl.className = "question-head";

  var scoreEl = document.createElement("p");
  scoreEl.className = "result-text";

  //display the score
  if (timeLeft > 0) {
    questionHeadEl.textContent = "ALL DONE -- LET'S SEE HOW YOU DID";
    scoreEl.textContent = "Your final score is " + timeLeft;
  } else if (timeLeft === 0) {
    questionHeadEl.textContent = "Ooops -- you ran out of time!!";
    scoreEl.textContent = "Your final score is " + timeLeft;
  }
  questionBodyEl.appendChild(questionHeadEl);
  questionBodyEl.appendChild(scoreEl);

  var userInfoEl = document.createElement("div");
  userInfoEl.className = "user-info";

  var userTextInfoEl = document.createElement("p");
  userTextInfoEl.className = "highscore-text";
  userTextInfoEl.innerHTML = "Enter Initials: ";
  userInfoEl.appendChild(userTextInfoEl);

  var userInputEl = document.createElement("input");
  userInputEl.className = "input";
  userInfoEl.appendChild(userInputEl);

  var submitButtonEl = document.createElement("button");
  submitButtonEl.className = "btn submit-btn";
  submitButtonEl.innerHTML = "Submit";
  userInfoEl.appendChild(submitButtonEl);

  questionBodyEl.appendChild(userInfoEl);
}

function viewHighscores(users) {
  highScoreEl.innerHTML = "";
  document.querySelector(".topbar").innerHTML = "";
  questionBodyEl.innerHTML = "";

  var highscoreDivEl = document.createElement("div");
  highscoreDivEl.className = "highscore-container";

  var highscoreTextEl = document.createElement("h2");
  highscoreTextEl.className = "question-head";
  highscoreTextEl.textContent = "High Scores";
  highscoreDivEl.appendChild(highscoreTextEl);

  var highscoreUlEl = document.createElement("ul");
  highscoreUlEl.className = "highscore-ul";
  highscoreDivEl.appendChild(highscoreUlEl);

  for (var i = 0; i < users.length; i++) {
    var highscoreLiEl = document.createElement("li");
    highscoreLiEl.innerHTML =
      i + 1 + ". " + users[i].name + " -- " + users[i].score;
    highscoreUlEl.appendChild(highscoreLiEl);
  }

  var backButtonEl = document.createElement("button");
  backButtonEl.className = "btn back-btn";
  backButtonEl.innerHTML = "Go back";
  highscoreDivEl.appendChild(backButtonEl);

  var clearButtonEl = document.createElement("button");
  clearButtonEl.className = "btn clear-btn";
  clearButtonEl.innerHTML = "Clear high scores";
  highscoreDivEl.appendChild(clearButtonEl);

  questionBodyEl.appendChild(highscoreDivEl);
}

questionBodyEl.addEventListener("click", function (event) {
  buttonHandler(event);
});
highScoreEl.addEventListener("click", function () {
  viewHighscores(users);
});

function saveInitials() {
  var userInput = document.querySelector("input").value;
  var userObj = {
    name: userInput,
    score: timeLeft,
  };
  users.push(userObj);
  userInput.innerHTML = "";

  localStorage.setItem("users", JSON.stringify(users));
  viewHighscores(users);
}

//adding an event listener on a future element
questionBodyEl.addEventListener("click", function (event) {
  if (event.target.className === "btn submit-btn") {
    saveInitials();
  } else if (event.target.className === "btn back-btn") {
    history.go(0);
  } else if (event.target.className === "btn clear-btn") {
    localStorage.removeItem("users");
    users = [];
    viewHighscores(users);
  } else {
  }
});
