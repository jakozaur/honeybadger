function drawBadger(ctx, badger) {
  var img = new Image();
  img.src = "badger.png";
  ctx.drawImage(img, badger.x, badger.y)
}

function drawLifeBar(ctx, player, x, y, width, height) {
  if (player) {
    var leftWidth = player.lifePoints * width / 100;
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, leftWidth, height);
  }
}

function drawLifeBarForCurrentPlayer(ctx) {
  var player = CurrentPlayer.get();
  var margin = 5;
  var height = 20;
  drawLifeBar(
    ctx,
    player,
    margin,
    Configuration.board.height - height - margin,
    Configuration.board.width - 2 * margin,
    height);
}

var HoneyBadgers = [];

function drawBoard () {

  window.requestAnimationFrame(drawBoard);

  var canvas = document.getElementById('game-canvas');

  if (!canvas) {
    alert("Unable to find canvas!")
    return; // <canvas> doesn't exist yet, don't do anything
  }

  var ctx = canvas.getContext('2d')

  if (!ctx) {
    return; // browser doesn't support drawing
  }

  ctx.clearRect(0, 0, Configuration.board.width, Configuration.board.height);

  if (CurrentPlayer.isUnderAttack()) {
    if (HoneyBadgers.length == 0) {
      var x = Math.random() * (Configuration.board.width - 200);
      var y = Math.random() * (Configuration.board.height - 150);
      HoneyBadgers = [{x: x, y: y}];
    } else {
      var dest = {
        x: (Configuration.board.width - 200) / 2,
        y: Configuration.board.height - 150
      };

      _.each(HoneyBadgers, function (badger) {
        var diff = {
          x: dest.x - badger.x,
          y: dest.y - badger.y
        };
        var distance = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
        badger.x += diff.x / distance;
        badger.y += diff.y / distance;
      });
    }
  } else {
    HoneyBadgers = [];
  }

  // draw initial dots
  _.each(HoneyBadgers, function (badger) {
    drawBadger(ctx, badger);
  });

  drawLifeBarForCurrentPlayer(ctx);

  // writing docs
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '300 10px serif';

  // draw player
  // _.each(_.pairs(Player), function (pair) {
  //   var id = pair[0];
  //   var el = pair[1];
  //   ctx.fillStyle = Configuration.player.colors[el.color];
  //   ctx.beginPath();
  //   var radius = Configuration.player.foodSizeToRadius(el.size);
  //   ctx.arc(el.x, el.y, radius, 0, Math.PI*2, false);
  //   ctx.closePath();
  //   ctx.fill();
  //   ctx.fillStyle = 'rgb(0, 0, 0)';
  //   ctx.fillText(el.name, el.x, el.y);
  // });
};

Template.canvas.onRendered(function () {
  window.requestAnimationFrame(drawBoard);

  var canvas = document.getElementById('game-canvas');
  canvas.width = Configuration.board.width;
  canvas.height = Configuration.board.height;
  // var handleCursor = _.throttle(function (event) {
  //   var ourPlayerId = Session.get('OurPlayerId');
  //   if (ourPlayerId) {
  //     var cursorX = event.clientX * Configuration.board.width / $(canvas).width();
  //     var cursorY = event.clientY * Configuration.board.height / $(canvas).height();

  //     Meteor.call('setPlayerCursor', ourPlayerId, cursorX, cursorY);
  //   }
  // }, 1000 / Configuration.player.cursorPerSecond);
  // canvas.addEventListener('mousemove', handleCursor);

  // var handleTouch = function (event) {
  //   event.preventDefault();
  //   event.clientX = 0;
  //   event.clientY = 0;
  //   for (var i = 0; i < event.touches.length; i++) {
  //     event.clientX += event.touches[i].clientX;
  //     event.clientY += event.touches[i].clientY;
  //   }

  //   event.clientX /= event.touches.length;
  //   event.clientY /= event.touches.length;

  //   handleCursor(event);
  // }
  // canvas.addEventListener("touchstart", handleTouch);
  // canvas.addEventListener("touchmove", handleTouch);

});
