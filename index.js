var push = require('./push')

module.exports = function config (service, _conf) {
  var conf = _conf || {}

  var service = push.getService(service, conf)

  return service
}