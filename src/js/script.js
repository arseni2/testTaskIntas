let menuToggle = document.querySelector('.menu-toggle');
let sidebar = document.querySelector('.sidebar');
let header = document.querySelector("header");
let subheader = document.querySelector(".subheader");
let isOpen = false;


menuToggle.addEventListener('click', function () {
  isOpen = !isOpen; // Переключение состояния
  menuToggle.classList.toggle("active", isOpen); // Добавляет или убирает класс "active"

  menuToggle.innerHTML = isOpen ?
      `<div class="flex">
        <img class="menu-close" src="./assets/icons/ArrowLeft.svg" alt="arrow">
        <h2 class="menu-title ml-43px pr-73px">ТЕСТЫ</h2>
    </div>` :
      `<span></span>
     <span></span>
     <span></span>`;

  sidebar.style.display = isOpen ? "block" : "none"; // Управление видимостью боковой панели
  header.style.flexDirection = isOpen ? "column" : ""; // Отключаем настройки при закрытии
  header.style.justifyContent = isOpen ? "start" : ""; // Отключаем настройки при закрытии
});
