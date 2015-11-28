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
    var query = {badger: "attack"};
    if (Players.find(query).count() == 0) {
      HoneyBadger.attack();
    } else {
      var player = Players.findOne(query);
      if (player.lifePoints <= 0) {
        HoneyBadger.attack();
      }
    }
  }, 500);
});
