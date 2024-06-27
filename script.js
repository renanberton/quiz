function nextQuestion(currentQuestion) {
   var selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);

   if (selected) {
       document.getElementById(`question${currentQuestion}`).style.display = "none";
       var nextQuestion = currentQuestion + 1;
       var nextQuestionElement = document.getElementById(`question${nextQuestion}`);

       if (nextQuestionElement) {
           nextQuestionElement.style.display = "block";
       } else {
           document.getElementById("finalize").style.display = "block";
       }
       document.getElementById(`nav${currentQuestion}`).disabled = false;
   } else {
       alert("Por favor, selecione uma resposta.");
   }
}

function goToQuestion(questionNumber) {
   var questions = document.getElementsByClassName("question");
   for (var i = 0; i < questions.length; i++) {
       questions[i].style.display = "none";
   }
   document.getElementById(`question${questionNumber}`).style.display = "block";
}

function finalizeQuiz() {
   alert("Obrigado por completar o quiz!");
   window.location.href = "agradecimento.html";
}
