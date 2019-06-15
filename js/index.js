var buttons = [
  document.getElementsByTagName('ul')[0].getElementsByTagName('li')[0],
  document.getElementsByTagName('ul')[0].getElementsByTagName('li')[1],
  document.getElementsByTagName('ul')[0].getElementsByTagName('li')[2]
];

var instruction,
    constructor,
    aboutMe;

buttons[0].addEventListener('click', function () {
  instruction = window.open('instruction.html', 'instruction', 'width=1280, height=720');
  instruction.moveTo(200, 200);
});

buttons[1].addEventListener('click', function () {
  instruction = window.open('aboutMe.html', 'aboutMe', 'width=700, height=400');
  instruction.moveTo(200, 200);
});
