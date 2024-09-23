"use strict";

var menuToggle = document.querySelector('.menu-toggle');
var sidebar = document.querySelector('.sidebar');
var header = document.querySelector("header");
var subheader = document.querySelector(".subheader");
var isOpen = false;
menuToggle.addEventListener('click', function () {
  isOpen = !isOpen; // Переключение состояния
  menuToggle.classList.toggle("active", isOpen); // Добавляет или убирает класс "active"

  menuToggle.innerHTML = isOpen ? "<div class=\"flex\">\n        <img class=\"menu-close\" src=\"./assets/icons/ArrowLeft.svg\" alt=\"arrow\">\n        <h2 class=\"menu-title ml-43px pr-73px\">\u0422\u0415\u0421\u0422\u042B</h2>\n    </div>" : "<span></span>\n     <span></span>\n     <span></span>";
  sidebar.style.display = isOpen ? "block" : "none"; // Управление видимостью боковой панели
  header.style.flexDirection = isOpen ? "column" : ""; // Отключаем настройки при закрытии
  header.style.justifyContent = isOpen ? "start" : ""; // Отключаем настройки при закрытии
});
//# sourceMappingURL=script.js.map
