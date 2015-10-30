(function() {

  // Если объектов FormData или FileReader нет в браузере,
  // то отправляем форму как обычно с перезагрузкой и без
  // превью фотографий
  if (!("FormData" in window) || !("FileReader" in window)) {
    return;
  }

  // Находим форму
  var form = document.querySelector(".form");
  // Находим div, в котором будут храниться превью фотографий
  var area = document.querySelector(".fieldset-photos__photos");

  // Находим шаблон, который будем вставлять в area
  // Шаблон находится в конце form.html в теге <script>
  var template = document.querySelector("#image-template").innerHTML;
  // Создаем массив для хранения файлов(фото)
  var queue = [];

  // Отлавливаем событие отправки формы
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Получаем все данные формы с помощью
    // объекта FormData
    var data = new FormData(form);

    // Добавляем файлы в data из массива для отправки
    queue.forEach(function(element) {
      data.append("images", element.file);
    })

    // Передаем данные в ф-цию(1-ым аргументом), 
    // отправляющую AJAX запрос.
    // 2-ым аргументом описываем ф-цию, которая вызовется 
    // в тот момент, когда результат с сервера придёт.
    // И выводим его в консоль
    request(data, function(response) {
      console.log(response);
    });
  });

  // Ф-ция отправляющая AJAX запрос
  function request(data, fn) {
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();

    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);

    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        // Передаём в функцию ответ сервера
        fn(xhr.responseText);
      }
    });

    xhr.send(data);
  }

  // Отлавливаем событие изменения input[type="file"]
  form.querySelector("#upload-photo").addEventListener("change", function() {
    // Получаем массив пользовательских файлов
    var files = this.files;
    // Перебираем массив и каждый файл кидаем в ф-цию preview
    for (var i = 0; i < files.length; i++) {
      preview(files[i]);
    }
    this.value = "";
  });

  // Ф-ция добавления превью фото,
  // которая получает файл
  function preview(file) {
    // Проверяем, что файл - это картинка
    if (file.type.match(/image.*/)) {
      // Создаем объект для чтения файла
      var reader = new FileReader();

      // Ждем когда файл загрузится и выводим его превью
      // в base64
      reader.addEventListener("load", function(event) {
        // Создаем переменную из шаблона template и вставляем 
        // в него изображение в base64 и имя файла
        var html = Mustache.render(template, {
          "image": event.target.result, // в base64
          "name": file.name
        });

        // Создаем элемент div, добавляем его на страницу
        // Добавляем div'у класс и вставляем в него шаблон
        var div = document.createElement("div");
        div.classList.add("fieldset-photos__photo");
        div.innerHTML = html;

        // Вкладываем div в область с фото
        area.appendChild(div);

        // Вызываем ф-цию удаления фото при клике на крестик
        div.querySelector(".fieldset-photos__delete").addEventListener("tap", function(event) {
          event.preventDefault();
          removePreview(div);
        });

        // Заносим файл и div в массив
        queue.push({
          "file": file,
          "div": div
        });
      });

      // Читаем данные из файла и загружаем
      reader.readAsDataURL(file);
    }
  }

  function removePreview(div) {
    queue = queue.filter(function(element) {
      return element.div != div;
    });

    div.parentNode.removeChild(div);
  }
})();
