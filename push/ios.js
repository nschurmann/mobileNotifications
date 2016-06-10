var _ = require('lodash'),
    apn = require('apn')

function handleFeedback (data) {
  console.log('Success on APN feedback', data)
}

function handleFeedbackError (err) {
  console.log('handleFeedbackError on APN feedback', err)
}

function handleError (err) {
  console.log('handleError on APN feedback', err)
}

function handleNoDevice () {
  console.log('No device, skip push notification.')
}

function Notification (_conf) {
  var conf

  if (!_conf) { throw new Error('no conf was passed.')}
  conf = _conf || {}
  if (!conf.cert || !conf.key) { throw new Error('Must pass at least a cert and key') }
  this.name = 'ios'
  this.conf = _.merge({ production: false, cacheLength: 100 }, conf)
  this.con = new apn.Connection(this.conf)

  new apn.Feedback(_.merge({}, conf, { batchFeedback: true, interval: 300 }))
  .on('feedback', handleFeedback)
  .on('feedbackError', handleFeedbackError)
  .on('error', handleError)
}

Notification.prototype.send = function _send (device, message, options) {
  if (device == undefined || device == null) { return handleNoDevice() }
  var notification = new apn.Notification()
  _.merge(notification, {sound: 'ping.aiff'}, options, { alert: message })

  try{
    this.con.pushNotification(notification, device)
  }catch(e){
    console.log('Error sending push notification', e)
  }

}

module.exports = Notification