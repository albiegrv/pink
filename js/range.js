(function() {

// На странице 2 дива с числовыми инпутами с + и -
// Находим их все по общему классу
  var elements = document.querySelectorAll(".number-range");

// Вызываем функцию на каждый из дивов
  for (var i = 0; i < elements.length; i++) {
    initNumberField(elements[i]);
}

// В каждом диве находим инпут, минус и плюс
  function initNumberField(parent) {
    var input = parent.querySelector("input");
    var minus = parent.querySelector(".number-range__minus");
    var plus  = parent.querySelector(".number-range__plus");

// Ждём клика по минусу и плюсу
    minus.addEventListener("click", function() {
      // При передаче в функцию false вычитаем 1
      changeNumber(false);
    });
    plus.addEventListener("click", function() { 
      // При передаче в функцию true добавляем 1
      changeNumber(true);
    });

// Функция, добавляющая или вычитающая 1 из значения
// инпута
    function changeNumber(operation) {
      var value = Number(input.value);

// Проверяем, что введено число,
// если нет, ставим 0
      if (isNaN(value)) {
        value = 1;
      }

// Прибавление/вычитание 
      if (operation) {
        input.value = value + 1;
      } else {
        if (value < 1) {
          input.value = 1;  // если отриц. число, то ставим 1
        } else {
          input.value = value - 1;
        }
        
      }
    }
  }

})();