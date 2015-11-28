Meteor.startup(function main() {
  var id = Session.get('playerId');
  if (!id) {
    var name = prompt("Łot ys jor nejm?");
    id = Players.insert({
      name: name,
      age: Date.now(),
      aliveAge: 0,
      lifePoints: 100
    });
    Session.set('playerId', id);
  }

  console.log(name);

  Meteor.setInterval(function loop() {
    //console.log(Date.now());
    var id = Session.get('playerId');
    var me = id && Players.findOne(id);
    var badger = me && me.badger;

    var updateObject = {$set: {age: Date.now()}, $inc: {}};
    if (badger) {
      updateObject['$inc']['lifePoints'] = -10;
    }
    if (me && me.lifePoints > 0) {
      updateObject['$inc']['aliveAge'] = 1;
    }
    if (Object.keys(updateObject['$inc']).length == 0) {
      delete updateObject['$inc'];
    }
    Players.update(id, updateObject);

  }, 1000);
});
