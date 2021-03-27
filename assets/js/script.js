var index = 0;

function startQuiz() {
  //clear the existiing content
  var questionBodyEl = document.querySelector(".question-body");
  console.log(questionBodyEl);
  questionBodyEl.innerHTML = "";

  var questionDivEL = document.createElement("div");
  questionDivEL.className = "question-container";

  questionBodyEl.appendChild(questionDivEL);

  var questionHeadEl = document.createElement("h2");
  questionHeadEl.className = "question-head";
  questionHeadEl.textContent = questions[index].question;
  questionDivEL.appendChild(questionHeadEl);

  console.log(questions[index].answers);

  //   for (var i = 0; i < questions[index].answers.length(); i++) {
  //     var buttonEl = document.createElement("button");
  //     buttonEl.className = "btn";
  //     buttonEl.textContent = questions[index].answers[1];
  //     questionDivEL.appendChild(buttonEl);
  //   }
}
