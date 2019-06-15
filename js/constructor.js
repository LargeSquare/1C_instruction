const fs = require('fs'); // импорт модуля для работы с файловой системой


var jsonOBJ,
    jsonMenu;

var roundPoints = 1,      // кол-во указателей действий на текущем изобращении
    roundImages = 1,      // кол-во изображений в текущем уроке
    currentIMG = 0,        // текущее отображаемое изображение
    currentPoint = 0,      // текущий отображаемый указатель действия
    text;                  // хранит имя текущего раздела

var leftUser = 0,         // переменные для описания положения кликера
    topUser = 0,
    widthUser = 0,
    heightUser = 0;

var q; //вспомогательные переменные

// переменные для заполнения объекта
var sequenceOBJ = {}, srcOBJ="",
    SPMofClickerOBJ = {},
    imgOBJ = {},
    pointOBJ = {},
    sizeOBJ = {}, widthOBJ = "", heightOBJ = "",
    positionOBJ = {}, leftOBJ = "", topOBJ = "",
    messageOBJ = "";

jsonMenu = fs.readFileSync(('app/json/itemsMenu.json'));
jsonMenu = JSON.parse(jsonMenu);






$(document).ready(function () {
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

  if(jsonOBJ.sequence.src){
    srcOBJ = jsonOBJ.sequence.src;
    $('.line input')[0].value = srcOBJ;
  }
  if(jsonOBJ.sequence.roundImages){
    roundImages = jsonOBJ.sequence.roundImages;
    $('.line input')[1].value = roundImages;
  }
  if(jsonOBJ.SPMofClicker.img_0.roundPoints){
    roundPoints = jsonOBJ.SPMofClicker.img_0.roundPoints;
    $('.line input')[3].value = roundPoints;
  }
  if(jsonOBJ.SPMofClicker.img_0.point_0.size.width){
    widthOBJ = jsonOBJ.SPMofClicker.img_0.point_0.size.width;
  }
  if(jsonOBJ.SPMofClicker.img_0.point_0.size.height){
    heightOBJ = jsonOBJ.SPMofClicker.img_0.point_0.size.height;
  }
  if(jsonOBJ.SPMofClicker.img_0.point_0.position.left){
    leftOBJ = jsonOBJ.SPMofClicker.img_0.point_0.position.left;
  }
  if(jsonOBJ.SPMofClicker.img_0.point_0.position.top){
    topOBJ = jsonOBJ.SPMofClicker.img_0.point_0.position.top;
  }
  if(jsonOBJ.SPMofClicker.img_0.point_0.message){
    messageOBJ = jsonOBJ.SPMofClicker.img_0.point_0.message;
    $('.line input')[5].value = messageOBJ;
  }





  // изменение DOM
  $("#image img").attr('src', jsonOBJ.sequence.src+'0.png');
  $("#nameOfPar").html(text);

  $('#currentStep').html('1');
  constructor();



  // переменные для заполнения объекта
  // var sequenceOBJ = {}, srcOBJ="",
  //     SPMofClickerOBJ = {},
  //     imgOBJ = {},
  //     pointOBJ = {},
  //     sizeOBJ = {}, widthOBJ = "", heightOBJ = "",
  //     positionOBJ = {}, leftOBJ = "", topOBJ = "",
  //     messageOBJ = "";


  // var roundPoints = 1,      // кол-во указателей действий на текущем изобращении
  //     roundImages = 1,      // кол-во изображений в текущем уроке
  //     currentIMG = 0,        // текущее отображаемое изображение
  //     currentPoint = 0,      // текущий отображаемый указатель действия
  //     text;                  // хранит имя текущего раздела


$('.minus').on('click', function () {
  $(this).next().val(Number($(this).next().val())-1);
  $(this).next().trigger('change');
});
$('.plus').on('click', function () {
  $(this).prev().val(Number($(this).prev().val())+1);
  $(this).prev().trigger('change');
});

// получение данных и внесение в переменные
$('.line input').on('change', function () {
  q = $(this).parent().index();

  switch (q) {
    case 2:
      if(Number($(this).val())>=0 && Number($(this).val())<roundImages){
        currentIMG = Number($(this).val());
      }else{
        $(this).val(0);
      }
      break;

    case 4:
      if(Number($(this).val())>=0 && Number($(this).val())<roundPoints){
        currentPoint = Number($(this).val());
      }else{
        $(this).val(0);
      }
      break;
    default: console.log('неудача');;

  }

  console.log(currentIMG, currentPoint);
  if(jsonOBJ.SPMofClicker['img_'+currentIMG].roundPoints){
    roundPoints = jsonOBJ.SPMofClicker['img_'+currentIMG].roundPoints;
    $('.line input')[3].value = roundPoints;
  }
  if(jsonOBJ.SPMofClicker['img_'+currentIMG]['point_'+currentPoint].size.width){
    widthOBJ = jsonOBJ.SPMofClicker['img_'+currentIMG]['point_'+currentPoint].size.width;
  }
  if(jsonOBJ.SPMofClicker['img_'+currentIMG]['point_'+currentPoint].size.height){
    heightOBJ = jsonOBJ.SPMofClicker['img_'+currentIMG]['point_'+currentPoint].size.height;
  }
  if(jsonOBJ.SPMofClicker['img_'+currentIMG]['point_'+currentPoint].position.left){
    leftOBJ = jsonOBJ.SPMofClicker['img_'+currentIMG]['point_'+currentPoint].position.left;
  }
  if(jsonOBJ.SPMofClicker['img_'+currentIMG]['point_'+currentPoint].position.top){
    topOBJ = jsonOBJ.SPMofClicker['img_'+currentIMG]['point_'+currentPoint].position.top;
  }
  if(jsonOBJ.SPMofClicker['img_'+currentIMG]['point_'+currentPoint].message){
    messageOBJ = jsonOBJ.SPMofClicker['img_'+currentIMG]['point_'+currentPoint].message;
    $('.line input')[5].value = messageOBJ;
  }



  switch (q) {
    case 0:
      src = $(this).val();
      break;

    case 1:
      if(Number($(this).val())>0){
        roundImages = Number($(this).val());
      }else{
        $(this).val(1);
      }
      break;

    case 3:
      if(Number($(this).val())>0 ){
        roundPoints = Number($(this).val());
      }else{
        $(this).val(1);
      }
      break;

    case 5:
      messageOBJ = $(this).val();
      break;
    default: console.log('неудача');;

  }

  sequenceOBJ.src = srcOBJ;
  sequenceOBJ.roundImages = roundImages;
  sizeOBJ.width = widthUser;
  sizeOBJ.height = heightUser;
  positionOBJ.left = leftUser;
  positionOBJ.top = topUser;
  pointOBJ.size = sizeOBJ;
  pointOBJ.position = positionOBJ;
  pointOBJ.message = messageOBJ;
  imgOBJ.roundPoints = roundPoints;
  imgOBJ['point_'+currentPoint] = pointOBJ;
  jsonOBJ.sequence = sequenceOBJ;

  if(jsonOBJ.SPMofClicker){
    // console.log(jsonOBJ.SPMofClicker['img_'+currentIMG]);
    // console.log(imgOBJ);
    jsonOBJ.SPMofClicker['img_'+currentIMG] = imgOBJ;
  }else{
    SPMofClickerOBJ['img_'+currentIMG] = imgOBJ;
    jsonOBJ.SPMofClicker = SPMofClickerOBJ;
  }

});

//Управление выделением
var listener = function (event) {
  event.stopPropagation();
  widthUser = Number(((event.layerX*100)/$("#image").get(0).clientWidth-leftUser).toFixed(1));
  heightUser = Number(((event.layerY*100)/$("#image").get(0).clientHeight-topUser).toFixed(1));
  $('#clicker').get(0).style.width = widthUser + '%';
  $('#clicker').get(0).style.height = heightUser + '%';
}

$("#image").get(0).addEventListener('mousedown', function (event) {
  event.stopPropagation();
  $('#clicker').get(0).style.width = 0;
  $('#clicker').get(0).style.height = 0;
  leftUser = Number(((event.layerX*100)/this.clientWidth).toFixed(1));
  topUser = Number(((event.layerY*100)/this.clientHeight).toFixed(1));
  $('#clicker').get(0).style.left = leftUser + '%';
  $('#clicker').get(0).style.top = topUser + '%';
  $("#image").get(0).addEventListener('mousemove', listener);
});

$("#image").get(0).addEventListener('mouseup', function (event) {
  event.stopPropagation();
  widthUser = Number(((event.layerX*100)/this.clientWidth-leftUser).toFixed(1));
  heightUser = Number(((event.layerY*100)/this.clientHeight-topUser).toFixed(1));
  $('#clicker').get(0).style.width = widthUser + '%';
  $('#clicker').get(0).style.height = heightUser + '%';
  $("#image").get(0).removeEventListener('mousemove', listener);
  constructor_2();
  $('.line input').trigger('change');
});







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


function constructor_2() {
  console.log(1);
  var widthCP = widthUser,
      heightCP = heightUser,
      leftCP = leftUser,
      topCP = topUser;
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
  console.log(clipPath);
  $('#blackBackground').css('-webkit-clip-path', clipPath);
}


});
