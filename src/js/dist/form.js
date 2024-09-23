"use strict";

// formLogic.js

var timerElement = document.getElementById("timer");
var dialogClose = document.getElementById("dialog_close");
var dialog = document.getElementById("dialog");
var overlay = document.getElementById("overlay");
var dialogExit = document.getElementById("dialog_exit");
var subheaderExit = document.querySelector(".subheader_exit");
var countElement = document.getElementById("subheader_controls_count");
var startTime = Date.now();
var totalTime = 0;
var totalQuestions = document.querySelectorAll('.form_fieldset').length;
var testTitle = document.getElementById("test_title") ? document.getElementById("test_title").textContent : "1";
document.querySelector('.subheader_reset').addEventListener('click', function () {
  clearDataFormStorage();
});
dialogClose.onclick = function () {
  dialog.close();
  overlay.style.display = 'none'; // Скрыть затемнение
};
subheaderExit.onclick = function () {
  overlay.style.display = 'block'; // Показать затемнение
  dialog.showModal(); // Открыть диалог
};
dialogExit.onclick = function () {
  clearDataFormStorage();
};
var clearDataFormStorage = function clearDataFormStorage() {
  var tests = JSON.parse(localStorage.getItem('tests')) || [];
  var updatedTests = tests.filter(function (test) {
    return test.testTitle !== testTitle;
  });
  localStorage.setItem('tests', JSON.stringify(updatedTests));
  window.location.href = window.location.href.replace(/_(form)\.html$/, '.html');
};
function updateTimer() {
  totalTime = Math.floor((Date.now() - startTime) / 1000);
  var hours = Math.floor(totalTime / 3600);
  var minutes = Math.floor(totalTime % 3600 / 60);
  var seconds = totalTime % 60;
  timerElement.textContent = "".concat(String(hours).padStart(2, '0'), ":").concat(String(minutes).padStart(2, '0'), ":").concat(String(seconds).padStart(2, '0'));
}
setInterval(updateTimer, 1000);
function updateAnswerCount() {
  var answeredCount = 0;
  document.querySelectorAll('.form_fieldset').forEach(function (fieldset) {
    if (fieldset.querySelector('input[type="radio"]:checked')) {
      answeredCount++;
    }
  });
  countElement.textContent = "".concat(answeredCount, "/").concat(totalQuestions);
}
updateAnswerCount();

// Сохраняем выбранные ответы в localStorage
document.querySelectorAll('input[type="radio"]').forEach(function (input) {
  input.addEventListener('change', function () {
    var tests = JSON.parse(localStorage.getItem('tests')) || [];
    var currentTest = tests.find(function (test) {
      return test.testTitle === testTitle;
    });
    if (!currentTest) {
      currentTest = {
        testTitle: testTitle,
        totalTime: totalTime,
        questions: {}
      };
      tests.push(currentTest);
    }
    var questionNumber = input.name.split('-')[1]; // Получаем номер вопроса
    currentTest.questions["question".concat(questionNumber)] = {
      answer: input.value,
      correctAnswer: document.querySelector("input[name=\"question-".concat(questionNumber, "\"][data-isCorrect=\"true\"]")).value
    };

    // Обновляем общее время выполнения
    currentTest.totalTime = totalTime;
    localStorage.setItem('tests', JSON.stringify(tests)); // Сохраняем в localStorage
    updateAnswerCount(); // Обновляем счетчик
  });
});
document.getElementById("submit-btn").addEventListener("click", function (e) {
  e.preventDefault(); // Предотвращает стандартное поведение формы

  var allAnswered = true;
  var questions = document.querySelectorAll("fieldset.form_fieldset");
  questions.forEach(function (question, index) {
    var checked = question.querySelector('input[type="radio"]:checked');
    if (!checked) {
      allAnswered = false;
      alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0442\u0432\u0435\u0442\u044C\u0442\u0435 \u043D\u0430 \u0432\u043E\u043F\u0440\u043E\u0441 ".concat(index + 1));
    }
  });
  if (allAnswered) {
    var tests = JSON.parse(localStorage.getItem('tests')) || [];
    var currentTest = tests.find(function (test) {
      return test.testTitle === testTitle;
    });
    if (currentTest) {
      currentTest.totalTime = totalTime; // Обновляем общее время
      localStorage.setItem('tests', JSON.stringify(tests)); // Сохраняем в localStorage
    }
    window.location.href = window.location.href.replace(/_(form)\.html$/, '.html');
  }
});
//# sourceMappingURL=form.js.map
