'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 100;
var BAR_WIDTH = 40;
var barHeight = 150;

var renderCloud = function(ctx, x, y, color, textColor) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = textColor;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', x + CLOUD_WIDTH/4, y + GAP*2);
  ctx.fillText('Список результатов:', x + CLOUD_WIDTH/4, y + GAP*4);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];
  
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  
  return maxElement;
};

window.renderStatistics = function(ctx, players, times) {
  
  
  
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)', '#000');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff', '#000');

  
  
  var maxTime = getMaxElement(times);
  
  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000'; 
    ctx.fillText(players[i], CLOUD_X + GAP + (GAP + TEXT_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP);

    if (players[i] === 'Вы') {
        ctx.fillStyle = "rgba(255, 0, 0, 1)";
        ctx.fillRect(CLOUD_X + GAP + (GAP * i) + (TEXT_WIDTH * i), CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP, BAR_WIDTH, -((barHeight * times[i]) / maxTime));
    } else {
        var randomBlueColor = function() {
            var b = Math.round(Math.random() * (100));
            return 'hsl(240, ' + b.toString() + '%, 50%)';
        };

        ctx.fillStyle = randomBlueColor();
        ctx.fillRect(CLOUD_X + GAP + (GAP * i) + (TEXT_WIDTH * i), CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP, BAR_WIDTH, -((barHeight * times[i]) / maxTime));
    }
  }
};