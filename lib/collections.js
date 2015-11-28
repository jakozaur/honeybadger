
function HoneyBadger(xCoord, yCoord) {
	this.x = xCoord
	this.y = yCoord
}

Players = new Mongo.Collection('players');
Badger = new Mongo.Collection('badger');
Badger.honeybadgers = [new HoneyBadger(100, 100)]
