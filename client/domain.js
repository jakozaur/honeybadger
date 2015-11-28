CurrentPlayer = {
  get: function() {
    var id = Session.get('playerId');
    var me = id && Players.findOne(id);
    return me;
  },

  isUnderAttack: function() {
    var me = CurrentPlayer.get();
    return me && me.badger == "attack";
  },

  isDead: function() {
    var me = CurrentPlayer.get();
    return !me || me.lifePoints <= 0;
  },

  create: function () {
    var id = Session.get('playerId');
    if (!id) {
      var name = "" + (Math.floor(Math.random() * 6) + 1) + ".png";
      id = Players.insert({
        name: name,
        age: Date.now(),
        aliveAge: 0,
        lifePoints: 100
      });
      Session.set('playerId', id);
    } else {
      Players.update(id, {$set: {
        aliveAge: 0,
        lifePoints: 100}
      }, function (err, result) {
        if (result == 0) {
          Session.set('playerId', null);
          CurrentPlayer.create();
        }
      });
    }
  }
}
