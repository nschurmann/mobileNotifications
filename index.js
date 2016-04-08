var push = require('./push')

module.exports = function config (_conf) {
  var conf = _conf || {}

  var service = push.getService(conf)

  return service
}