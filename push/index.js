var services         = {
  ios: require('./ios'),
  android: require('./android'),
}


function getService (service, _config) {
  var p = _config || {}
  if (!service || typeof service !== 'string') {
    throw new Error('You need to select a service')
  }

  var s = services[service]
  if (s == undefined) { throw new Error('The service does not exist') }

  return new s(p)
}

module.exports = {
  getService: getService
}