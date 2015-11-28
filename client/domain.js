CurrentPlayer = {
  get: function() {
    var id = Session.get('playerId');
    var me = id && Players.findOne(id);
    return me;
  },

  isUnderAttack: function() {
    var me = CurrentPlayer.get();
    return me && me.badger == "attack";
  }
}
