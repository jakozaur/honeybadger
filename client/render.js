function drawBadger(ctx, badger) {
  var img = new Image();
  img.src = "badger.png";
  ctx.drawImage(img, badger.x, badger.y)
}

function drawAttackWarning(ctx) {
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = 'bold 35px sans-serif';
  ctx.fillText("ATTACKED!", Configuration.board.width / 2,  100)
}

function aliveText(player) {
  if (player.lifePoints > 0) {
    return "Alive " + player.lifePoints + "/100"
  } else {
    return "Dead"
  }
}

function howLongAlive(player) {
    var aliveAge = player.aliveAge;
    var seconds = aliveAge % 60;
    seconds = seconds + "";
    if (seconds.length == 1) {
      seconds = "0" + seconds;
    }
    var mins = Math.floor(aliveAge / 60);
    return mins + ":" + seconds
}

function drawPlayersBoard(ctx) {

  ctx.font = 'bold 15px sans-serif';

  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
  ctx.lineWidth="4";
  ctx.strokeStyle="green";
  ctx.fillRect(20, 20, 300, 200)
  ctx.stroke()

  _.each(Players.find().fetch(), function(player, id) {
    var msg = player.name + " " + aliveText(player) + " " + howLongAlive(player)
    var xOffset = 110
    if(player.badger) {
      msg += " ATTACKED!";
      xOffset += 45
    }
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.fillText(msg, xOffset, (id + 1) * 30)
  })
}

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

  // draw initial dots
  _.each(Badger.honeybadgers, function (badger) {
    if (CurrentPlayer.isUnderAttack()) {
      drawBadger(ctx, badger);
    }
  });

  var underAttack = CurrentPlayer.isUnderAttack()
  if (underAttack) {
    drawAttackWarning(ctx)
  }

  // writing docs
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '300 10px serif';

  drawPlayersBoard(ctx)

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
