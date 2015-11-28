Template.player.helpers({
  howLongAlive: function () {
    var deadSince = this.deadSince || Date.now();
    var aliveAge = Math.floor((deadSince - this.aliveSince) / 1000);
    var seconds = aliveAge % 60;
    seconds = seconds + "";
    if (seconds.length == 1) {
      seconds = "0" + seconds;
    }
    var mins = Math.floor(aliveAge / 60);
    return mins + ":" + seconds
  }
});
