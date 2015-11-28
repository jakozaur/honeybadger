Meteor.startup(function main() {
  var id = Session.get('playerId');
  if (!id) {
    var name = prompt("Łot ys jor nejm?");
    id = Players.insert({name: name, age: Date.now()});
    Session.set('playerId', id);
  }

  console.log(name);

  Meteor.setInterval(function loop() {
    console.log(Date.now());
    Players.update(id, {$set: {age: Date.now()}});
  }, 1000);
});
