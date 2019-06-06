/*
  Устройство/структура программы разработана Данилюком Сергеем. Заполнял json файлы, делал скриншоты, создавал инструкции Сычев Александр.

  Если ты читаешь это, то скорее всего хочешь как-то доработать приложение. Что ж... Добро пожаловать в мой маленький мирок. Меня зовут Серега.
  Специально для тебя я оставил комментарии с СОВСЕМ кратким описанием функций. Разобраться будет не сложно, т.к. всё работает "на счетчиках".
  Для начала: указатель действия- та прямоугольная зона, которая мигает. На нее можно кликнуть и перейти к следующему шагу (дублирование кнопки "следующий шаг").
  В json файле заданы все параметры каждого шага инструкции. Эти данные выступают как некие "ограничители" (переменные round*) и счетчики (переменные current*).
  Счетчик current не может выйти за соответствующее ограничение round.
  Также в json указаны сообщения, размеры и положение указателя действия. На их основе генерируется этот самый указатель.
*/

/*
  Программа разработана на
    nwjs-sdk-v0.36.4-win-x64
  и
    node.js 10.15.2

  Также используется библиотека
    jquery 3.4.1

  Обновления могут быть найдены в этом репозитории GitHub- https://github.com/LargeSquare/1C_instruction.git
  Любые улучшения могут быть предложены там же
*/

// SPMofClicker - size, position, message кликера




const fs = require('fs'); // импорт модуля для работы с файловой системой

var jsonOBJ,
    jsonSettings;

var roundPoints,      // кол-во указателей действий на текущем изобращении
    roundImages,      // кол-во изображений в текущем уроке
    currentIMG = 0,        // текущее отображаемое изображение
    currentPoint = 0,      // текущий отображаемый указатель действия
    text;                  // хранит имя текущего раздела



jsonSettings = fs.readFileSync(('app/json/settings.json'));
jsonSettings = JSON.parse(jsonSettings);


// установка начального состояния программы
$(document).ready(function () {

  // установка настроек (пока только одна- показ сообщений о том, что делать)
  if(jsonSettings.showMessages == 'true'){
    document.getElementsByClassName('set')[0].getElementsByTagName('input')[0].setAttribute('checked', 'checked');
  }else{
    $('#messages').css('width', '0%');
  }

// заполнение переменных
  text = document.getElementsByClassName('chapter')[0].getElementsByTagName('li')[0].innerHTML;
  jsonOBJ = fs.readFileSync(('app/json/'+text+'.json'));
  jsonOBJ = JSON.parse(jsonOBJ);

  roundImages = jsonOBJ.sequence.roundImages;
  roundPoints = jsonOBJ.SPMofClicker['img_'+currentIMG].roundPoints;

// изменение DOM
  $("#image img").attr('src', jsonOBJ.sequence.src+'0.png');
  $("#nameOfPar").html(text);

  $('ol').html(''); // обнуление описания раздела
  // добавление описания раздела по пунктам
  for(var i = 0; i < roundImages; i++){
    for(var j = 0; j < jsonOBJ.SPMofClicker['img_'+i].roundPoints; j++){
      var li = document.createElement('li');
      li.innerHTML = jsonOBJ.SPMofClicker['img_'+i]['point_'+j].message;
      $('ol').append(li);
    }
  }

  $('#currentStep').html('1');
  constructor();
});


// вызывается при клике на пункт меню
$("#menu .chapter li").on('click', function () {
// заполнение переменных
  text = $(this).html();
  jsonOBJ = fs.readFileSync(('app/json/'+text+'.json'));
  jsonOBJ = JSON.parse(jsonOBJ);
  currentPoint = 0;
  currentIMG = 0;
  roundPoints = jsonOBJ.SPMofClicker['img_'+currentIMG].roundPoints;
  roundImages = jsonOBJ.sequence.roundImages;

// изменение DOM
  $("#image img").attr('src', jsonOBJ.sequence.src+'0.png');
  $("#nameOfPar").html(text);

  $('ol').html(''); // обнуление описания раздела
  // добавление описания раздела по пунктам
  for(var i = 0; i < roundImages; i++){
    for(var j = 0; j < jsonOBJ.SPMofClicker['img_'+i].roundPoints; j++){
      var li = document.createElement('li');
      li.innerHTML = jsonOBJ.SPMofClicker['img_'+i]['point_'+j].message;
      $('ol').append(li);
    }
  }

  $('#currentStep').html('1');
  constructor();
});


// срабатывает при клике на указатель действия
$('#clicker').on('click', function () {
  if(currentPoint+1 < roundPoints){
    currentPoint++;
  }else{
    if(currentIMG+1 < roundImages){
      currentIMG++;
      roundPoints = jsonOBJ.SPMofClicker['img_'+currentIMG].roundPoints;
      currentPoint = 0;
    }
  }
  $('#currentStep').html(currentIMG+1);
  $('#image img').attr('src', (jsonOBJ.sequence.src+currentIMG+'.png'));
  constructor();
});


// следующий шаг
$('#next').on('click',  function () {
  if(currentPoint+1 < roundPoints){
    currentPoint++;
  }else{
    if(currentIMG+1 < roundImages){
      currentIMG++;
      roundPoints = jsonOBJ.SPMofClicker['img_'+currentIMG].roundPoints;
      currentPoint = 0;
    }
  }
  $('#currentStep').html(currentIMG+1);
  $('#image img').attr('src', (jsonOBJ.sequence.src+currentIMG+'.png'));
  constructor();
});


// предыдущий шаг
$('#prev').on('click',  function () {
  if(currentPoint-1 >= 0){
    currentPoint--;
  }else{
    if(currentIMG-1 >= 0){
      currentIMG--;
      roundPoints = jsonOBJ.SPMofClicker['img_'+currentIMG].roundPoints;
      currentPoint = roundPoints-1;
    }
  }
  $('#currentStep').html(currentIMG+1);
  $('#image img').attr('src', (jsonOBJ.sequence.src+currentIMG+'.png'));
  constructor();
});


// раскрытие раздела "о разработчике"
$('#buttonAboutMe').on('click', function () {
  if($('#textAboutMe').css('height') == '0px'){
    $('#textAboutMe').css('height', 'auto');
    $('#textAboutMe').css('padding-top', '0.5em');
    $('#buttonAboutMe img').css('transform', 'rotate(-90deg)');
  }else{
    $('#textAboutMe').css('height', '0px');
    $('#textAboutMe').css('padding-top', '0em');
    $('#buttonAboutMe img').css('transform', 'rotate(90deg)');
  }
});


// изменение настройки показа сообщений
document.getElementsByClassName('set')[0].getElementsByTagName('input')[0].addEventListener('change', function () {
  if(this.checked){
    jsonSettings.showMessages = 'true';
    $('#messages').css('width', '30%');
  }else{
    jsonSettings.showMessages = 'false';
    $('#messages').css('width', '0');
  }
  fs.writeFileSync('app/json/settings.json', JSON.stringify(jsonSettings));
});


// функция построения указателя действия
function constructor(ci, cp) {
      var widthCP = Number(jsonOBJ.SPMofClicker['img_'+currentIMG]['point_'+currentPoint].size.width),
          heightCP = Number(jsonOBJ.SPMofClicker['img_'+currentIMG]['point_'+currentPoint].size.height),
          leftCP = Number(jsonOBJ.SPMofClicker['img_'+currentIMG]['point_'+currentPoint].position.left),
          topCP = Number(jsonOBJ.SPMofClicker['img_'+currentIMG]['point_'+currentPoint].position.top);
      var clipPath,
          beforeCP = 'polygon(0% 0%, ',
          afterCP = '100% 0%, 100% 100%, 0% 100%)';

      clipPath = beforeCP + (
        (leftCP+'% 0%, ')+                      // 1 точка
        (leftCP+'% '+(topCP+heightCP)+'% ,')+         // 2 точка
        ((leftCP+widthCP)+'% '+(topCP+heightCP)+'% ,')+   // 3 точка
        ((leftCP+widthCP)+'% '+topCP+'% ,')+          // 4 точка
        (leftCP+'% '+topCP+'% ,')+               // 5 точка
        (leftCP+'% 0%, ')                       // 1 точка
      ) +afterCP;

      $('#blackBackground').css('-webkit-clip-path', clipPath);
      $('#clicker').css('width', widthCP+'%');
      $('#clicker').css('height', heightCP+'%');
      $('#clicker').css('left', leftCP+'%');
      $('#clicker').css('top', topCP+'%');
      showMessage(jsonOBJ.SPMofClicker['img_'+currentIMG]['point_'+currentPoint].message);
}

//показ сообщения
function showMessage(text) {
  $('#message').css('right', '-20em');
  setTimeout(function () {
    $('#message').html(text);
    $('#message').css('right', '0');
  }, 200);
}
