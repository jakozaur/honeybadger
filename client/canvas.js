Template.canvas.events({
  "click #game-canvas": function() {
    var id = Session.get('playerId');
    Players.update(id, {$unset: {badger: ""}});
  }
});
