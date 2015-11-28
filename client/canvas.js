Template.canvas.events({
  "click #game-canvas": function(event) {
    if (CurrentPlayer.isDead()) {
      var id = Session.get('playerId');
      Players.update(id, {$set: {
        aliveAge: 0,
        lifePoints: 100}
      });
    } else {
      var id = Session.get('playerId');
      console.log(event);
      var canvas = document.getElementById('game-canvas');
      var cursorPos = getCursorPosition(canvas,event);
      console.log(cursorPos);
	_.each(HoneyBadgers, function(badger) {
		console.log(badger);
       if ((cursorPos.x > badger.x && cursorPos.x < badger.x + Configuration.honeybadger.width) &&
               (cursorPos.y > badger.y && cursorPos.y < badger.y + Configuration.honeybadger.height)) {
                       console.log("Badger defeated!");
                       Players.update(id, {$unset: {badger: ""}});
               } //TODO: delete just the right badger, not all of them
      });
    }
  }
});

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return {"x":  x, "y": y};
};
