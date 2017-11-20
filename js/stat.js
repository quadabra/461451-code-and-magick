'use strict';

var polygonDraw = function (shiftX, shiftY, ctx, fillColor) {
  var cloudX = [120, 120, 140, 140, 480, 480, 500, 500, 520, 520, 515, 515, 520, 520, 500, 500, 480, 480, 140, 140, 120, 120, 100, 100, 105, 105, 100, 100];
  var cloudY = [30, 10, 10, 15, 15, 10, 10, 30, 30, 40, 40, 250, 250, 260, 260, 280, 280, 275, 275, 280, 280, 260, 260, 250, 250, 40, 40, 30];
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.moveTo(cloudX[0] + shiftX, cloudY[0] + shiftY);
  for (var i = 1; i < cloudX.length; i++) {
    ctx.lineTo(cloudX[i] + shiftX, cloudY[i] + shiftY);
  }
  ctx.closePath();
  ctx.fill();
};

var drawStatSheet = function (ctx) {
  var shadowColor = 'rgba(0, 0, 0, 0.7)';
  var sheetColor = 'rgba(255, 255, 255, 1.0)';
  polygonDraw(10, 10, ctx, shadowColor);
  polygonDraw(0, 0, ctx, sheetColor);
};

var findMinMax = function (arr) {
  var max = -1;
  var maxIndex = -1;
  var min = arr[0];
  var minIndex = 0;

  for (var i = 0; i < arr.length; i++) {
    var time = arr[i];
    if (time > max) {
      max = time;
      maxIndex = i;
    }
    if (time <= min) {
      min = time;
      minIndex = i;
    }
  }
  return {
    'min': min,
    'minIndex': minIndex,
    'max': max,
    'maxIndex': maxIndex
  };
};

var drawStatsText = function (times, names, user, scores, ctx) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  if (names[scores.minIndex] === user) {
    ctx.fillText('Ура вы победили!', 120, 40);
  } else {
    ctx.fillText('Список результатов', 120, 40);
  }
  ctx.fillText('Худшее время: ' + scores.max.toFixed(0) + 'мс у игрока ' + names[scores.maxIndex], 120, 60);
};

var drawHistogram = function (timesArr, namesArr, user, scores, ctx) {
  var histogramHeight = 150;
  var step = histogramHeight / scores.max;
  var barWidth = 40;
  var indent = 90;
  var initialX = 155;
  var initialY = 220;
  var lineHeight = 20;

  for (var i = 0; i < timesArr.length; i++) {
    if (namesArr[i] === user) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.ceil(Math.random() * 10) / 10 + ')';
    }
    ctx.fillRect(initialX + indent * i, initialY, barWidth, -timesArr[i] * step);
    ctx.fillStyle = '#000';
    ctx.fillText(namesArr[i], initialX + indent * i, initialY + lineHeight);
    ctx.fillText(timesArr[i].toFixed(0), initialX + indent * i, initialY + lineHeight * 2);
  }
};

window.renderStatistics = function (ctx, names, times) {
  var keyUser = 'Вы';
  var userScore = findMinMax(times);
  drawStatSheet(ctx);
  drawStatsText(times, names, keyUser, userScore, ctx);
  drawHistogram(times, names, keyUser, userScore, ctx);
};
