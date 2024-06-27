document.addEventListener('DOMContentLoaded', function () {
   var answers = document.querySelectorAll('.answer');
   answers.forEach(function (answer) {
       answer.addEventListener('click', function () {
           var currentQuestion = this.dataset.question;
           var selectedAnswer = this.dataset.answer;

           document.querySelectorAll(`.question#question${currentQuestion} .answer`).forEach(function (el) {
               el.classList.remove('selected');
           });
           this.classList.add('selected');

           document.getElementById(`question${currentQuestion}`).style.display = "none";

           var nextQuestion = parseInt(currentQuestion) + 1;
           var nextQuestionElement = document.getElementById(`question${nextQuestion}`);

           if (nextQuestionElement) {
               nextQuestionElement.style.display = "block";
           } else {
               // Mostra a mensagem e o botão de finalizar apenas quando todas as perguntas forem respondidas
               document.getElementById("finalize-container").style.display = "block";
           }

           document.getElementById(`nav${currentQuestion}`).disabled = false;
           document.getElementById(`nav${currentQuestion}`).classList.add('answered');

           updateNavigationButtons();
       });
   });

   function updateNavigationButtons() {
       var allQuestionsAnswered = true;

       for (var i = 1; i <= 3; i++) { 
           var questionElement = document.getElementById(`question${i}`);

           if (questionElement.style.display !== "none") {
               allQuestionsAnswered = false;
               break;
           }
       }

       if (allQuestionsAnswered) {
           for (var i = 1; i <= 3; i++) {
               document.getElementById(`nav${i}`).classList.add('answered');
           }
       }
   }
});

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

function refazerQuiz() {
   window.location.href = "index.html";
}
