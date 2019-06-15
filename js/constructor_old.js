

const fs = require('fs'); // импорт модуля для работы с файловой системой


var jsonOBJ,
    jsonSettings,
    jsonMenu;

var roundPoints,      // кол-во указателей действий на текущем изобращении
    roundImages,      // кол-во изображений в текущем уроке
    currentIMG = 0,        // текущее отображаемое изображение
    currentPoint = 0,      // текущий отображаемый указатель действия
    text;                  // хранит имя текущего раздела

var counter, q, s, m, p, t, r; //вспомогательные переменные


jsonSettings = fs.readFileSync(('app/json/settings.json'));
jsonSettings = JSON.parse(jsonSettings);
jsonMenu = fs.readFileSync(('app/json/itemsMenu.json'));
jsonMenu = JSON.parse(jsonMenu);

// установка начального состояния программы
$(document).ready(function () {

  // установка настроек (пока только одна- показ сообщений о том, что делать)
  if(jsonSettings.showMessages == 'true'){
    document.getElementsByClassName('set')[0].getElementsByTagName('input')[0].setAttribute('checked', 'checked');
  }else{
    $('#messages').css('width', '0%');
  }

//Заполнение textarea в меню
  for(var i in jsonMenu){
    var textA = document.createElement('textarea');
    textA.innerHTML = jsonMenu[i];
    $('.chapter').append(textA);
  }

// заполнение переменных
  text = document.getElementsByClassName('chapter')[0].getElementsByTagName('textarea')[0].innerHTML;
  jsonOBJ = fs.readFileSync(('app/json/'+text+'.json'));
  jsonOBJ = JSON.parse(jsonOBJ);

  roundImages = jsonOBJ.sequence.roundImages;
  roundPoints = jsonOBJ.SPMofClicker['img_'+currentIMG].roundPoints;

// изменение DOM
  $("#image img").attr('src', jsonOBJ.sequence.src+'0.png');
  $("#nameOfPar").html(text);

  // $('ol').html(''); // обнуление описания раздела
  // добавление описания раздела по пунктам
  // for(var i = 0; i < roundImages; i++){
  //   for(var j = 0; j < jsonOBJ.SPMofClicker['img_'+i].roundPoints; j++){
  //     var li = document.createElement('li');
  //     li.innerHTML = jsonOBJ.SPMofClicker['img_'+i]['point_'+j].message;
  //     $('ol').append(li);
  //   }
  // }

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


// функция построения указателя действия
function constructor() {
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
}

function save() {

}
