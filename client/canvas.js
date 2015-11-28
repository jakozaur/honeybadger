Template.canvas.events({
  "click #game-canvas": function(event) {
    var canvas = document.getElementById('game-canvas');
    var cursorPos = getCursorPosition(canvas,event);
    if (CurrentPlayer.isDead()) {
      var id = Session.get('playerId');
      if (cursorPos.y > Configuration.board.height - 100 &&
        cursorPos.x > Configuration.board.width / 2 - 50 &&
        cursorPos.x < Configuration.board.width / 2 + 50) {
        CurrentPlayer.create();
      }
    } else {
      var id = Session.get('playerId');
      console.log(event);
      console.log(cursorPos);
    	_.each(HoneyBadgers, function(badger) {
    		console.log(badger);
           if ((cursorPos.x > badger.x && cursorPos.x < badger.x + Configuration.honeybadger.width) &&
                   (cursorPos.y > badger.y && cursorPos.y < badger.y + Configuration.honeybadger.height)) {
                           console.log("Badger defeated!");
                           Players.update(id, {$unset: {badger: "", taking_damage: ""}});
                   } //TODO: delete just the right badger, not all of them
        });
    }
  }
});

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = Math.round((event.clientX - rect.left) / (rect.right - rect.left)* canvas.width);
    var y = Math.round((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);
    return {"x":  x, "y": y};
};
