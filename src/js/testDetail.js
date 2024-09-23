const retryBtn = document.querySelector("#retry-btn")
const clearTestFromStorage = () => {
    const testTitle = document.querySelector('.sidebar li.active').textContent;
    const tests = JSON.parse(localStorage.getItem('tests')) || [];
    const updatedTests = tests.filter(test => test.testTitle !== testTitle);
    localStorage.setItem('tests', JSON.stringify(updatedTests)); // Сохраняем обновленный массив
}
retryBtn.addEventListener("click", (e) => {
    clearTestFromStorage()
    window.location.href = e.target.dataset.redirectUrl
})

const resetAnswers = () => {
    clearTestFromStorage()
    window.location.reload()
}

function updateSubheaderWithTestDetails(currentTest, answeredCount, totalQuestions, userName, formattedTime) {
    const subheader = document.querySelector('.subheader');
    subheader.innerHTML = `
      <p class="subheader_exit">Выход</p>
      <h3>${currentTest.testTitle}</h3>
      <div class="subheader_controls">
          <p id="resetAnswers" onclick="resetAnswers()">Сбросить все ответы</p>
          <div class="subheader_divider"></div>
          <p id="subheader_controls_count">${answeredCount}/${totalQuestions}</p>
          <div class="subheader_divider"></div>
          <p id="timer">${formattedTime}</p>
      </div>
  `;
}

function updateSubheaderDescription() {
    const subheader = document.querySelector('.subheader');
    subheader.innerHTML = `
      <h2 class="subheader_title">
          Описание
      </h2>
  `;
}

function loadTestResults() {
    const testTitle = document.querySelector('.sidebar li.active').textContent;
    const tests = JSON.parse(localStorage.getItem('tests')) || [];
    const currentTest = tests.find(test => test.testTitle === testTitle);
    const userName = localStorage.getItem('userName') || 'Гость';

    const answeredCount = currentTest ? Object.keys(currentTest.questions).filter(q => currentTest.questions[q].answer).length : 0;
    const totalQuestions = currentTest ? Object.keys(currentTest.questions).length : 0;

    if (currentTest) {
        const formattedTime = formatElapsedTime(currentTest.totalTime || 0);
        updateSubheaderWithTestDetails(currentTest, answeredCount, totalQuestions, userName, formattedTime);

        //document.getElementById('result-title').textContent = testTitle;
        let questionsHTML = '';

        Object.keys(currentTest.questions).forEach((questionNumber, index) => {
            const questionData = currentTest.questions[questionNumber];
            questionsHTML += `
        <div>
          <h3>${index + 1}. Вопрос</h3>
          <p>Правильный ответ: ${questionData.correctAnswer}</p>
          <p>Вы ответили: ${questionData.answer ? questionData.answer : 'Не ответили.'}</p>
        </div>
      `;
        });

        document.getElementById('result-summary').textContent = `Вы ответили на ${answeredCount} из ${totalQuestions} вопросов.`;
        document.getElementById('questions-list').innerHTML = questionsHTML;

        document.getElementById('test-result').style.display = 'block';
        document.getElementById('start-description').style.display = 'none';
    } else {
        updateSubheaderDescription(); // Обновление subheader в случае отсутствия теста
        document.getElementById('start-description').style.display = 'block';
        document.getElementById('test-result').style.display = 'none';
    }

    function formatElapsedTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}
window.onload = () => {
    loadTestResults()
}


