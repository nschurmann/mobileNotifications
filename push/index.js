var _               = require('lodash'),
    services         = {
      ios: require('./ios'),
      android: require('./android'),
    }


function getService (service, _config) {
  var p = _config || {}
  if (!service || typeof service !== 'string') {
    throw new Error('You need to select a service')
  }

  try{
    return new services[service](_.merge({}, p))
  }catch(e){
    throw new Error('The service does not exist')
  }

}

module.exports = {
  getService: getService
}