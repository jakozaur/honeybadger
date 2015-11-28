Meteor.startup(function main() {
  var recentlySeen = {};
  Meteor.setInterval(function findDeadPlayers() {
    var activePlayers = Players.find().fetch();

    function isDead(player) {
      if (!player.age)
        return true;

      if (!recentlySeen[player._id])
        return false;

      return recentlySeen[player._id] > player.age + 3000;
    }

    activePlayers.forEach(function(player) {
      if (isDead(player)) {
        console.log('removing player ' + player._id);
        Players.remove(player._id);
      } else {
        recentlySeen[player._id] = Math.max(player.age, (recentlySeen[player._id] || 0) + 950);
      }
    });
  }, 1000);

  Meteor.setInterval(function badgerAttacks () {
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
  }, 5000);
});
