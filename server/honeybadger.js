HoneyBadger = {
  attack: function() {
    var players = Players.find().fetch();

    // Remove previous badger
    _.forEach(players, function (player) {
      if (player.badger) {
        Players.update(player._id, {$unset: {badger: ""}});
      }
    });

    // Add new player under attack
    var alivePlayers = _.filter(players, function (player) {
      return player.lifePoints > 0;
    });
    if (alivePlayers.length > 0) {
      var badgerId = Math.floor(Math.random() * alivePlayers.length);
      var playerUnderAttack = alivePlayers[badgerId];
      console.log("player " + playerUnderAttack.name + " is under attack id " +
        playerUnderAttack._id + " badgerId " + badgerId );
      Players.update(playerUnderAttack._id, {$set: {badger: "attack"}});
    }    
  }
}
