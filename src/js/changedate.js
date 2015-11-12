(function() {

  var area = document.querySelector(".form__date-field");

  var start = area.querySelector("#departure-date-field");
  var duration = area.querySelector("#trip-duration-field");
  var end = area.querySelector("#return-date-field");

  var minus = area.querySelector(".number-range__minus");
  var plus = area.querySelector(".number-range__plus");

  // Используя библиотеку moment.js заносим в поле 
  // выезда сегодняшнюю дату
  start.value = moment().format("YYYY-MM-DD");

  minus.addEventListener("tap", function(event) {
    end.value = moment(start.value).add(duration.value, 'days').format("YYYY-MM-DD");

  });

  plus.addEventListener("tap", function(event) {
    end.value = moment(start.value).add(duration.value, 'days').format("YYYY-MM-DD");

  });

})();
