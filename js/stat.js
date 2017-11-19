'use strict';

window.renderStatistics = function (ctx, names, times) {

  var cloudX = [100, 170, 240, 350, 420, 520, 530, 520, 320, 220, 100, 110, 100];
  var cloudY = [10, 0, 15, 5, 0, 10, 150, 270, 280, 275, 260, 160, 10];

  var polygonDraw = function (shiftX, shiftY) {
    ctx.beginPath();
    ctx.moveTo(cloudX + shiftX, cloudY + shiftY);
    for (var i = 0; i < cloudX.length; i++) {
      ctx.lineTo(cloudX[i] + shiftX, cloudY[i] + shiftY);
    }
    ctx.closePath();
    ctx.fill();
  };

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';  //тень
  polygonDraw(10, 10);
  ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
  polygonDraw(0, 0);
  ctx.fillStyle = '#000'; // black;
  ctx.font = '14px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);

  var max = -1;
  var maxIndex = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
      maxIndex = i;
    }
  }

  var histogramWidth = 150;              // px;
  var step = histogramWidth / max; // px;

  ctx.fillText('Худшее время: ' + max.toFixed(0) + 'мс у игрока ' + names[maxIndex], 120, 60);

  var barWidth = 40; // px;
  var indent = 50;    // px;
  var initialX = 220; // px;
  var initialY = 240;  // px;
  var lineHeight = 25;// px;

  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.ceil(Math.random() * 10) / 10 + ')';
    }
    ;
    ctx.fillRect(initialX + indent * i, initialY, barWidth, -times[i] * step);
    ctx.fillText(names[i], initialX + indent * i, initialY + lineHeight);
  }
};
