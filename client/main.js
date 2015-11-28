Meteor.startup(function main() {
  CurrentPlayer.create();

  console.log(name);

  Meteor.setInterval(function loop() {
    //console.log(Date.now());
    var id = Session.get('playerId');
    var me = id && Players.findOne(id);
    var badger = me && me.badger;
	var taking_damage = me && me.taking_damage;

    var updateObject = {$set: {age: Date.now()}, $inc: {}};
    if (badger && taking_damage) {
		RenderBloodSince = Date.now();
      	updateObject['$inc']['lifePoints'] = -10;
    }
    if (me && me.lifePoints > 0) {
      updateObject['$inc']['aliveAge'] = 1;
      updateObject['$set']['highestAliveAge'] =
        Math.max(me.aliveAge + 1, me.highestAliveAge);
    }
    if (Object.keys(updateObject['$inc']).length == 0) {
      delete updateObject['$inc'];
    }
    Players.update(id, updateObject);

  }, 1000);
});
