var index = 0;

function startQuiz() {
  //clear the existiing content
  var questionBodyEl = document.querySelector(".question-body");
  console.log(questionBodyEl);
  questionBodyEl.innerHTML = "";

  var questionHeadEl = document.createElement("h2");
  questionHeadEl.className = "question-head";
  questionHeadEl.textContent = questions[index].question;
  questionBodyEl.appendChild(questionHeadEl);

  console.log(questions[index].answers);

  var answers = questions[index].answers;
  for (var i = 0; i < answers.length; i++) {
    var buttonEl = document.createElement("button");
    buttonEl.className = "btn btn-questions";
    buttonEl.textContent = questions[index].answers[i];
    questionBodyEl.appendChild(buttonEl);
  }
}
