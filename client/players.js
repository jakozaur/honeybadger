Template.players.helpers({
  yourName: function () {
    var id = Session.get('playerId');
    var me = id && Players.findOne(id);
    return me && me.name;
  },

  areYouUnderAttack: function () {
    var id = Session.get('playerId');
    var me = id && Players.findOne(id);
    return me && me.badger;
  },

  activePlayers: function () {
    return Players.find();
  },

  youreDead: function() {
    var id = Session.get('playerId');
    var me = id && Players.findOne(id);
    return !me || me.lifePoints <= 0;
  }

});
