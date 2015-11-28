Template.canvas.events({
  "click #game-canvas": function() {
    if (CurrentPlayer.isDead()) {
      var id = Session.get('playerId');
      Players.update(id, {$set: {
        aliveAge: 0,
        lifePoints: 100}
      });
    } else {
      var id = Session.get('playerId');
      Players.update(id, {$unset: {badger: ""}});
    }
  }
});
