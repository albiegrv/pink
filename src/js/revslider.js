(function() {

  // Находим все контролы
  var controls = document.querySelectorAll(".review-slider__control");

  // Вызываем ф-цию на каждый из контролов
  for (var i = 0; i < controls.length; i++) {
    changeControl(controls[i], i);
  }

  // Находим стрелочки
  var left = document.querySelector(".review-slider__arrow-wrap--left");
  var right = document.querySelector(".review-slider__arrow-wrap--right");
  var slides = document.querySelectorAll(".review-slider__slide");

  // Ловим клик на правую стрелку
  left.addEventListener("tap", function() {
    // Находим текущий слайд
    var current = document.querySelector(".review-slider__slide--active");
    // Находим следующий слайд
    var prev = current.previousElementSibling;

    if (prev != null) {
      current.classList.remove("review-slider__slide--active");
      prev.classList.add("review-slider__slide--active");
    }

  });

  // Ловим клик на правую стрелку
  right.addEventListener("tap", function() {
    // Находим текущий слайд
    var current = document.querySelector(".review-slider__slide--active");
    // Находим следующий слайд
    var next = current.nextElementSibling;

    if (next != null) {
      current.classList.remove("review-slider__slide--active");
      next.classList.add("review-slider__slide--active");
    }

  });

  // Ф-ция, сменяюшая активный контрол
  function changeControl(control, number) {
    // Отлавливаем клик по каждому контролу
    control.addEventListener("tap", function() {

      var oldcontrol = document.querySelector(".review-slider__control--active");
      oldcontrol.classList.remove("review-slider__control--active");

      // Добавляем оформление контролу, на который
      // пришёлся клик
      control.classList.add("review-slider__control--active");

      // Вызываем ф-цию смены слайда
      changeSlide(number);
    });
  }

  // Ф-ция, выбирающая соответствующий контролу слайдер
  function changeSlide(number) {
    var slides = document.querySelectorAll(".review-slider__slide");

    for (var j = 0; j < slides.length; j++) {
      slides[j].classList.remove("review-slider__slide--active");
    }

    slides[number].classList.add("review-slider__slide--active");
  }

})();
