(function() {

  // Находим блок для ввода путешественников
  var area = document.querySelector(".form__travellers-inner");

  // Находим блок с числовым input
  var parent = document.querySelector(".form__travel-number");
  // Находим input с количеством путешественников
  var input = parent.querySelector("input");

  // Находим минус
  var minus = area.querySelector(".number-range__minus");
  // Находим плюс
  var plus  = area.querySelector(".number-range__plus");

  // Находим шаблон, который будем вставлять в area
  // Шаблон находится в конце form.html в теге <script>
  var template = document.querySelector("#traveller-template").innerHTML;

  // Отлавливаем клик по плюсу
  plus.addEventListener("tap", function(event) {

    var value = input.value;

    // Вставляем в наш шаблон значения из input
    var html = Mustache.render(template, {
      "number": value
    });

    // Создаем элемент div, добавляем его на страницу, 
    // Добавляем div'у класс и вставляем в него шаблон
    var div = document.createElement("div");
    div.classList.add("form__travel-item");
    div.innerHTML = html;

    // Добавляем div в конец нашего блока
    area.appendChild(div);
  });

  //Ловим клик на минус
  minus.addEventListener("tap", function(event) {
    // Находим все добавленные дивы
    var travellers = document.querySelectorAll(".form__travel-item");

    // Находим последний
    // (при клике на "-" значение
    // в инпуте уменьшается (скрипт range.js),
    // поэтому как раз подходит input.value)
    var lastDiv = travellers[input.value];

    // Удаляем его
    lastDiv.parentNode.removeChild(lastDiv);
  });
})();
