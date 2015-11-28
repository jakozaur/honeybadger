Meteor.startup(function main() {
  var id = Session.get('playerId');
  if (!id) {
    var name = prompt("Łot ys jor nejm?");
    id = Players.insert({name: name, age: Date.now(), lifePoints: 100});
    Session.set('playerId', id);
  }

  console.log(name);

  Meteor.setInterval(function loop() {
    //console.log(Date.now());
    var id = Session.get('playerId');
    var me = id && Players.findOne(id);
    var badger = me && me.badger;

    if (badger) {
      Players.update(id, {$set: {age: Date.now()}, $inc: {lifePoints: -10}});
    } else {
      Players.update(id, {$set: {age: Date.now()}});
    }

  }, 1000);
});
