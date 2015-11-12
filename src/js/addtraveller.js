(function() {

  // Находим блок для ввода путешественников
  var area = document.querySelector(".form__travellers-inner");

  // Находим input с количеством путешественников
  var input = document.querySelector("#number-of-travellers-field");

  // Находим минус
  var minus = area.querySelector(".number-range__minus");
  // Находим плюс
  var plus  = area.querySelector(".number-range__plus");

  // Находим шаблон, который будем вставлять в area
  // Шаблон находится в конце form.html в теге <script>
  var template = document.querySelector("#traveller-template").innerHTML;

  // Отлавливаем клик по плюсу
  plus.addEventListener("tap", function(event) {

    // Вставляем в наш шаблон значения из input
    var html = Mustache.render(template, {
      "number": input.value
    });

    // Создаем элемент div, добавляем его на страницу, 
    // Добавляем div'у класс и вставляем в него шаблон
    var div = document.createElement("div");
    div.classList.add("form__travel-item");
    div.innerHTML = html;

    // Добавляем div в конец нашего блока
    area.appendChild(div);

    // Удаление по клику на "удалить"
    // Удаляется нужный див, но не меняется номер путешественника
    div.querySelector(".form__travel-delete").addEventListener("tap", function(event) {
      event.preventDefault();
      div.parentNode.removeChild(div);
      input.value = input.value - 1;
    });
  });

  // Ловим клик на минус
  minus.addEventListener("tap", function(event) {
    // Находим всех путешественников
    var travellers = area.querySelectorAll(".form__travel-item");

    // Если пушественников > 1, то удаляем последнего
    if (travellers.length > 1) {

      // Находим последний div (путешественника)
      // (при клике на "-" значение
      // в инпуте уменьшается (скрипт range.js),
      // поэтому как раз подходит input.value)
      var lastDiv = travellers[input.value];

      // Удаляем его
      lastDiv.parentNode.removeChild(lastDiv);
    } else {
      // Если путешественник 1, то ничего не делаем
      return;
    }
  });

})();
