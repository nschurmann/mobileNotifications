function Notification (_conf) {
  this.conf = _conf.android
  this.name = 'android'
}

Notification.prototype.send = function _send (x) {
  // body...
}

module.exports = Notification