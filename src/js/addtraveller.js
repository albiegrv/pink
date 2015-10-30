(function() {

  // Находим блок для ввода путешественников
  var area = document.querySelector(".fieldset-travellers")

  // Находим блок с числовым input
  var parent = document.querySelector(".fieldset-travellers__number");

  // Находим input с количеством путешественников
  var input = parent.querySelector("input");

  // Находим минус
  var minus = area.querySelector(".number-range__minus");

  // Находим плюс
  var plus  = area.querySelector(".number-range__plus");

  // Находим шаблон, который будем вставлять в area
  // Шаблон находится в конце form.html в теге <script>
  var template = document.querySelector("#traveller-template").innerHTML;

  //
  // Отлавливаем клик по плюсу
  plus.addEventListener("tap", function(event) {
    // Вызываем ф-цию c параметром для добавления
    var value = input.value;

    // Вставляем в наш шаблон значения из input
    var html = Mustache.render(template, {
      "number": value
    });

    // Создаем элемент div, добавляем его на страницу, 
    // Добавляем div'у класс и вставляем в него шаблон
    var div = document.createElement("div");
    div.classList.add("fieldset-travellers__item");
    div.innerHTML = html;

    // Добавляем div в конец нашего блока
    area.appendChild(div);

    minus.addEventListener("tap", function(event) {
      removeTraveller(div);
    });
  });

  //
  // Ф-ция изменения количества путешественников
  function removeTraveller(div) {
      div.parentNode.removeChild(div);
  }
})();
