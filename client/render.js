function drawBadger(ctx, badger) {
  var img = new Image();
  if(badger.x > Configuration.board.height / 2) {
  	img.src = "badger.png";
  }else{
  	img.src = "badger_flipped.png";
  }
  ctx.drawImage(img, badger.x, badger.y);
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

function drawMe(ctx) {
  var player = CurrentPlayer.get();
  if (player) {
    var path = "players/" + player.name;
    var img = new Image();
    img.src = path;
    ctx.drawImage(
      img,
      Configuration.board.width / 2 - 50,
      Configuration.board.height - 120);
  }
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
  ctx.fillRect(20, 20, 200, Players.find().count() * 40 + 30);
  ctx.stroke();

  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = 'bold 25px sans-serif';
  ctx.fillText("PLAYERS", 120, 20)

  ctx.font = 'bold 15px sans-serif';
  var players = Players.find({}, {sort: [['aliveAge', 'desc']]}).fetch();
  _.each(players, function(player, id) {
    var img = new Image();
    img.src = 'players/' + player.name;
    ctx.drawImage(img, 40, (id + 1) * 40, 40, 40);
    drawLifeBar(ctx, player, 90, (id + 1) * 40, 60, 20);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText(howLongAlive(player), 120, (id + 1) * 40 + 30);
    if(player.badger) {
      var headImg = new Image();
      headImg.src = "badger_head.png";
      ctx.drawImage(headImg, 160, (id + 1) * 40, 40, 40);
    }

    // var msg = player.name + " " + aliveText(player) + " " + howLongAlive(player)
    // var xOffset = 110
    //
    //   msg += " ATTACKED!";
    //   xOffset += 45
    // }
    // ctx.fillStyle = 'rgb(255, 255, 255)'
    // ctx.fillText(msg, xOffset, (id + 1) * 30)
  })
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

HoneyBadgers = [];
RenderBloodSince = 0;

var lastDrawMs = Date.now();

function drawBoard () {

  window.requestAnimationFrame(drawBoard);

  var canvas = document.getElementById('game-canvas');

  if (!canvas) {
    return; // <canvas> doesn't exist yet, don't do anything
  }

  var ctx = canvas.getContext('2d')

  if (!ctx) {
    return; // browser doesn't support drawing
  }

  ctx.clearRect(0, 0, Configuration.board.width, Configuration.board.height);

  if (CurrentPlayer.isUnderAttack()) {
    if (HoneyBadgers.length == 0) {
      var x = Math.round(Math.random()) * (Configuration.board.width - Configuration.honeybadger.width);
      var y = Math.random() * (Configuration.board.height - Configuration.honeybadger.height);
      HoneyBadgers = [{x: x, y: y}];
    } else {
      var dest = {
        x: (Configuration.board.width - Configuration.honeybadger.width) / 2 + 100,
        y: Configuration.board.height - Configuration.honeybadger.height - 50
      };

      _.each(HoneyBadgers, function (badger) {
      	if(badger.x > Configuration.board.height / 2) {
      		var badger_dest_offset = 0;
      	} else {
      		var badger_dest_offset = -200; // attack from left side if coming from left
      	}
      	
        var diff = {
          x: dest.x - badger.x + badger_dest_offset,
          y: dest.y - badger.y
        };
        var distance = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
        var timeElapsed = Date.now() - lastDrawMs;
        var speed = Configuration.honeybadger.speed * timeElapsed;
        //console.log("x = " + badger.x + " y = " + badger.y + " speed = " + speed + " distance = " + distance);

        if (distance < speed) {
          badger.x += diff.x;
          badger.y += diff.y;
          id = Session.get('playerId');
          Players.update(id, {$set: {"taking_damage": true}});          
        } else {
          var moveBy = Math.min(speed, distance);
          badger.x += diff.x / distance * moveBy;
          badger.y += diff.y / distance * moveBy;
        }

      });
    }
  } else {
    HoneyBadgers = [];
  }

  var bloodMs = Date.now() - RenderBloodSince;
  if (bloodMs < Configuration.renderBloodForMs) {
    ctx.save();
    ctx.globalAlpha = 1.0 - bloodMs / Configuration.renderBloodForMs;
    ctx.fillStyle = "#FF0000"
    ctx.fillRect(0, 0, Configuration.board.width, Configuration.board.height);
    ctx.restore();
    console.log("Blood!")
  }

  // draw initial dots
  _.each(HoneyBadgers, function (badger) {
    drawBadger(ctx, badger);
  });

  if (CurrentPlayer.isDead()) {
    ctx.font = "50px bold arial";
    ctx.fillStyle = "black";
    ctx.fillText("All your base are belong to us!",
    Configuration.board.width / 2,
    Configuration.board.height / 4);
  } else {
    drawLifeBarForCurrentPlayer(ctx);
  }

  drawMe(ctx);

  // writing docs
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '300 10px serif';

  drawPlayersBoard(ctx)

  lastDrawMs = Date.now();
};

Template.canvas.onRendered(function () {
  window.requestAnimationFrame(drawBoard);

  var canvas = document.getElementById('game-canvas');
  canvas.width = Configuration.board.width;
  canvas.height = Configuration.board.height;
});
