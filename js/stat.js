'use strict';

window.renderStatistics = function (ctx, names, times) {

  var cloudX = [120, 120, 140, 140, 480, 480, 500, 500, 520, 520, 515, 515, 520, 520, 500, 500, 480, 480, 140, 140, 120, 120, 100, 100, 105, 105, 100, 100];
  var cloudY = [30, 10, 10, 15, 15, 10, 10, 30, 30, 40, 40, 250, 250, 260, 260, 280, 280, 275, 275, 280, 280, 260, 260, 250, 250, 40, 40, 30];

  var polygonDraw = function (shiftX, shiftY) {
    ctx.beginPath();
    ctx.moveTo(cloudX[0] + shiftX, cloudY[0] + shiftY);
    for (var i = 1; i < cloudX.length; i++) {
      ctx.lineTo(cloudX[i] + shiftX, cloudY[i] + shiftY);
    }
    ctx.closePath();
    ctx.fill();
  };

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  polygonDraw(10, 10);
  ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
  polygonDraw(0, 0);
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  var max = -1;
  var maxIndex = -1;
  var min = times[0];
  var minIndex = 0;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
      maxIndex = i;
    }
    if (time <= min) {
      min = time;
      minIndex = i;
    }
  }

  if (names[minIndex] === 'Вы') {
    ctx.fillText('Ура вы победили!', 120, 40);
  } else {
    ctx.fillText('Cписок результатов', 120, 40);
  }

  var histogramWidth = 150;
  var step = histogramWidth / max;

  ctx.fillText('Худшее время: ' + max.toFixed(0) + 'мс у игрока ' + names[maxIndex], 120, 60);

  var barWidth = 40;
  var indent = 90;
  var initialX = 155;
  var initialY = 230;
  var lineHeight = 25;

  for (var j = 0; j < times.length; j++) {
    if (names[j] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.ceil(Math.random() * 10) / 10 + ')';
    }

    ctx.fillRect(initialX + indent * j, initialY, barWidth, -times[j] * step);
    ctx.fillText(names[j], initialX + indent * j, initialY + lineHeight);
  }
};
