var _               = require('lodash'),
    service         = {
      ios: require('./ios'),
      android: require('./android'),
    }


function getService (_config) {
  var p = _config || {}

  if (!p.service) {
    throw new Error('You need to pass some configuration')
  }

  try{
    return new service[p.service](_.merge({}, p))
  }catch(e){
    throw new Error('The service does not exist')
  }

}

module.exports = {
  getService: getService
}