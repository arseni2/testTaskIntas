"use strict";

var retryBtn = document.querySelector("#retry-btn");
var clearTestFromStorage = function clearTestFromStorage() {
  var testTitle = document.querySelector('.sidebar li.active').textContent;
  var tests = JSON.parse(localStorage.getItem('tests')) || [];
  var updatedTests = tests.filter(function (test) {
    return test.testTitle !== testTitle;
  });
  localStorage.setItem('tests', JSON.stringify(updatedTests)); // Сохраняем обновленный массив
};
retryBtn.addEventListener("click", function (e) {
  clearTestFromStorage();
  window.location.href = e.target.dataset.redirectUrl;
});
var resetAnswers = function resetAnswers() {
  clearTestFromStorage();
  window.location.reload();
};
function updateSubheaderWithTestDetails(currentTest, answeredCount, totalQuestions, userName, formattedTime) {
  var subheader = document.querySelector('.subheader');
  subheader.innerHTML = "\n      <p class=\"subheader_exit\">\u0412\u044B\u0445\u043E\u0434</p>\n      <h3>".concat(currentTest.testTitle, "</h3>\n      <div class=\"subheader_controls\">\n          <p id=\"resetAnswers\" onclick=\"resetAnswers()\">\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0432\u0441\u0435 \u043E\u0442\u0432\u0435\u0442\u044B</p>\n          <div class=\"subheader_divider\"></div>\n          <p id=\"subheader_controls_count\">").concat(answeredCount, "/").concat(totalQuestions, "</p>\n          <div class=\"subheader_divider\"></div>\n          <p id=\"timer\">").concat(formattedTime, "</p>\n      </div>\n  ");
}
function updateSubheaderDescription() {
  var subheader = document.querySelector('.subheader');
  subheader.innerHTML = "\n      <h2 class=\"subheader_title\">\n          \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435\n      </h2>\n  ";
}
function loadTestResults() {
  var testTitle = document.querySelector('.sidebar li.active').textContent;
  var tests = JSON.parse(localStorage.getItem('tests')) || [];
  var currentTest = tests.find(function (test) {
    return test.testTitle === testTitle;
  });
  var userName = localStorage.getItem('userName') || 'Гость';
  var answeredCount = currentTest ? Object.keys(currentTest.questions).filter(function (q) {
    return currentTest.questions[q].answer;
  }).length : 0;
  var totalQuestions = currentTest ? Object.keys(currentTest.questions).length : 0;
  if (currentTest) {
    var formattedTime = formatElapsedTime(currentTest.totalTime || 0);
    updateSubheaderWithTestDetails(currentTest, answeredCount, totalQuestions, userName, formattedTime);

    //document.getElementById('result-title').textContent = testTitle;
    var questionsHTML = '';
    Object.keys(currentTest.questions).forEach(function (questionNumber, index) {
      var questionData = currentTest.questions[questionNumber];
      questionsHTML += "\n        <div>\n          <h3>".concat(index + 1, ". \u0412\u043E\u043F\u0440\u043E\u0441</h3>\n          <p>\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442: ").concat(questionData.correctAnswer, "</p>\n          <p>\u0412\u044B \u043E\u0442\u0432\u0435\u0442\u0438\u043B\u0438: ").concat(questionData.answer ? questionData.answer : 'Не ответили.', "</p>\n        </div>\n      ");
    });
    document.getElementById('result-summary').textContent = "\u0412\u044B \u043E\u0442\u0432\u0435\u0442\u0438\u043B\u0438 \u043D\u0430 ".concat(answeredCount, " \u0438\u0437 ").concat(totalQuestions, " \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432.");
    document.getElementById('questions-list').innerHTML = questionsHTML;
    document.getElementById('test-result').style.display = 'block';
    document.getElementById('start-description').style.display = 'none';
  } else {
    updateSubheaderDescription(); // Обновление subheader в случае отсутствия теста
    document.getElementById('start-description').style.display = 'block';
    document.getElementById('test-result').style.display = 'none';
  }
  function formatElapsedTime(seconds) {
    var hrs = Math.floor(seconds / 3600);
    var mins = Math.floor(seconds % 3600 / 60);
    var secs = seconds % 60;
    return "".concat(hrs.toString().padStart(2, '0'), ":").concat(mins.toString().padStart(2, '0'), ":").concat(secs.toString().padStart(2, '0'));
  }
}
window.onload = function () {
  loadTestResults();
};
//# sourceMappingURL=testDetail.js.map
