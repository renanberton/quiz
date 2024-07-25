document.addEventListener('DOMContentLoaded', function () {
    var answers = document.querySelectorAll('.answer');
    var correctAnswers = {
        1: 'a',
        2: 'a',
        3: 'c',
        4: 'c',
        5: 'c',
        6: 'a',
        7: 'c',
        8: 'c',
        9: 'c',
        10: 'b'
    };
    var userAnswers = {};
    var totalQuestions = 10;

    answers.forEach(function (answer) {
        answer.addEventListener('click', function () {
            var currentQuestion = this.dataset.question;
            var selectedAnswer = this.dataset.answer;

            // Armazenar a resposta do usuário
            userAnswers[currentQuestion] = selectedAnswer;

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
                document.getElementById("finalize-container").style.display = "block";
            }

            document.getElementById(`nav${currentQuestion}`).disabled = false;
            document.getElementById(`nav${currentQuestion}`).classList.add('answered');

            updateNavigationButtons();
        });
    });

    function updateNavigationButtons() {
        var allQuestionsAnswered = true;

        for (var i = 1; i <= totalQuestions; i++) { 
            var questionElement = document.getElementById(`question${i}`);

            if (questionElement && questionElement.style.display !== "none") {
                allQuestionsAnswered = false;
                break;
            }
        }

        if (allQuestionsAnswered) {
            for (var i = 1; i <= totalQuestions; i++) {
                document.getElementById(`nav${i}`).classList.add('answered');
            }
        }
    }

    window.goToQuestion = function(questionNumber) {
        var questions = document.getElementsByClassName("question");

        for (var i = 0; i < questions.length; i++) {
            questions[i].style.display = "none";
        }

        document.getElementById(`question${questionNumber}`).style.display = "block";
    };

    window.finalizeQuiz = function() {
        var score = 0;

        for (var question in userAnswers) {
            if (userAnswers[question] === correctAnswers[question]) {
                score++;
            }
        }

        // Armazenar a pontuação no localStorage
        localStorage.setItem('quizScore', score);
        localStorage.setItem('totalQuestions', totalQuestions);
        
        // Redirecionar para a página de agradecimento
        window.location.href = "agradecimento.html";
    };

    window.refazerQuiz = function() {
        window.location.href = "index.html";
    };
});
