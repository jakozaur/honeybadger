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

Template.players.events({
  'click #fuck-you': function () {
    var id = Session.get('playerId');
    Players.update(id, {$unset: {badger: ""}});
  },
  'click #respawn': function () {
    var id = Session.get('playerId');
    Players.update(id, {$set: {
      aliveSince: Date.now(),
      lifePoints: 100}, $unset: {
        deadSince: ""
      }
    });
  }
});
