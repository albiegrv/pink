(function() {

  // Находим ссылку в которой лежат иконки бургера и крестика
  var toggle = document.querySelector(".main-header__toggle");

  // Находим видимую иконку бургера
  var burger = document.querySelector(".main-header__burger--visible");

  //Находим скрытую иконку крестика
  var close = document.querySelector(".main-header__cross");

  // Находим верхний блок хедера со всей навигацией
  var wrap = document.querySelector(".main-header__nav-inner");

  // Находим скрытое меню
  var nav = document.querySelector(".main-nav");


  // Отлавливаем событие "клик" на нашей ссылке
  // для открытия меню
  toggle.addEventListener("tap", function(event){

    // Убираем действие по умолчанию
    event.preventDefault();

    // Прячем/показываем иконку бургера
    burger.classList.toggle("main-header__burger");

    // Показываем/прячем иконку крестика
    close.classList.toggle("main-header__cross--visible");

    // Меняем/возвращаем оформление верхней полосы навигации
    wrap.classList.toggle("main-header__nav-inner--menu-visible");

    // Показываем/прячем меню
    nav.classList.toggle("main-nav--visible");
  });
})();
