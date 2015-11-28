Meteor.startup(function main() {
  var id = Session.get('playerId');
  if (!id) {
    var name = prompt("Łot ys jor nejm?");
    id = Players.insert({name: name, age: 0});
    Session.set('playerId', id);
  }

  console.log(name);

  Meteor.setInterval(function loop() {
    Players.update(id, {$inc: {age: 1}})
  }, 1000);
});
