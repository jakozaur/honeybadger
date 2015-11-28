Template.player.helpers({
  aliveText: function () {
    if (this.lifePoints > 0) {
      return "Alive " + this.lifePoints + "/100"
    } else {
      return "Dead"
    }
  },
  howLongAlive: function () {
    var aliveAge = this.aliveAge;
    var seconds = aliveAge % 60;
    seconds = seconds + "";
    if (seconds.length == 1) {
      seconds = "0" + seconds;
    }
    var mins = Math.floor(aliveAge / 60);
    return mins + ":" + seconds
  }
});
