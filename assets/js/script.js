var index = 0;
var timeLeft = 60;
var questionBodyEl = document.querySelector(".question-body");
var countdownEl = document.getElementById("countdown");

function startTimer() {
  var countDown = setInterval(function () {
    if (timeLeft > 0) {
      countdownEl.innerText = "TIME: " + timeLeft;
      timeLeft--;
    } else if (timeLeft === 0) {
      //call a function that the quiz is over and display the score
      countdownEl.innerText = "TIME: 0";
    }
  }, 1000);
}

function createQuestion(questIndex) {
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

function checkAnswer(button) {
  var buttonIndex = button.textContent;
  if (buttonIndex === questions[index - 1].correctAnswer) {
    console.log("add 10 seconds to the timer");
    timeLeft += 10;
    displayAnswer(true);
  } else {
    console.log("deduct 10 seconds to the timer");
    timeLeft -= 10;
    displayAnswer(false);
  }
}

function buttonHandler(event) {
  //if the start button is clicked it does not check if the answer is correct
  if (event.target.matches(".start-btn")) {
    createQuestion(index);
    startTimer(0);
    index++;

    // if the event.target matches the classname .question then the user clicked the button
  } else if (event.target.matches(".question-btn")) {
    checkAnswer(event.target);
    //delay the next answer for 1s
    setTimeout(function () {
      createQuestion(index);
    }, 1500);

    if (index > questions.length - 1) {
      alert("call the end function");
      //call the end function
    } else {
      index++;
    }
  }
}

questionBodyEl.addEventListener("click", buttonHandler);
