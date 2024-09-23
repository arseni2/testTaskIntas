// formLogic.js

let timerElement = document.getElementById("timer");
let dialogClose = document.getElementById("dialog_close");
let dialog = document.getElementById("dialog");
let overlay = document.getElementById("overlay");
let dialogExit = document.getElementById("dialog_exit");
let subheaderExit = document.querySelector(".subheader_exit");
let countElement = document.getElementById("subheader_controls_count");
let startTime = Date.now();
let totalTime = 0;
let totalQuestions = document.querySelectorAll('.form_fieldset').length;
const testTitle = document.getElementById("test_title") ? document.getElementById("test_title").textContent : "1";

document.querySelector('.subheader_reset').addEventListener('click', function() {
    clearDataFormStorage();
});

dialogClose.onclick = () => {
    dialog.close();
    overlay.style.display = 'none'; // Скрыть затемнение
}

subheaderExit.onclick = () => {
    overlay.style.display = 'block'; // Показать затемнение
    dialog.showModal(); // Открыть диалог
}

dialogExit.onclick = () => {
    clearDataFormStorage();
}

let clearDataFormStorage = () => {
    const tests = JSON.parse(localStorage.getItem('tests')) || [];

    const updatedTests = tests.filter(test => test.testTitle !== testTitle);
    localStorage.setItem('tests', JSON.stringify(updatedTests));

    window.location.href = window.location.href.replace(/_(form)\.html$/, '.html');
}

function updateTimer() {
    totalTime = Math.floor((Date.now() - startTime) / 1000);
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;
    timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

setInterval(updateTimer, 1000);

function updateAnswerCount() {
    let answeredCount = 0;
    document.querySelectorAll('.form_fieldset').forEach(fieldset => {
        if (fieldset.querySelector('input[type="radio"]:checked')) {
            answeredCount++;
        }
    });
    countElement.textContent = `${answeredCount}/${totalQuestions}`;
}
updateAnswerCount();

// Сохраняем выбранные ответы в localStorage
document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', () => {
        const tests = JSON.parse(localStorage.getItem('tests')) || [];
        let currentTest = tests.find(test => test.testTitle === testTitle);

        if (!currentTest) {
            currentTest = {
                testTitle: testTitle,
                totalTime: totalTime,
                questions: {}
            };
            tests.push(currentTest);
        }

        let questionNumber = input.name.split('-')[1]; // Получаем номер вопроса
        currentTest.questions[`question${questionNumber}`] = {
            answer: input.value,
            correctAnswer: document.querySelector(`input[name="question-${questionNumber}"][data-isCorrect="true"]`).value
        };

        // Обновляем общее время выполнения
        currentTest.totalTime = totalTime;

        localStorage.setItem('tests', JSON.stringify(tests)); // Сохраняем в localStorage
        updateAnswerCount(); // Обновляем счетчик
    });
});

document.getElementById("submit-btn").addEventListener("click", function (e) {
    e.preventDefault(); // Предотвращает стандартное поведение формы

    let allAnswered = true;
    const questions = document.querySelectorAll("fieldset.form_fieldset");
    questions.forEach((question, index) => {
        const checked = question.querySelector('input[type="radio"]:checked');
        if (!checked) {
            allAnswered = false;
            alert(`Пожалуйста, ответьте на вопрос ${index + 1}`);
        }
    });

    if (allAnswered) {
        const tests = JSON.parse(localStorage.getItem('tests')) || [];
        let currentTest = tests.find(test => test.testTitle === testTitle);
        if (currentTest) {
            currentTest.totalTime = totalTime; // Обновляем общее время
            localStorage.setItem('tests', JSON.stringify(tests)); // Сохраняем в localStorage
        }
        window.location.href = window.location.href.replace(/_(form)\.html$/, '.html');
    }
});
