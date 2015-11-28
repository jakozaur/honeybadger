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

  players: function () {
    return Players.find();
  }

});
