#Mobile Push Notifications

This package is inteded to provide a unified interface over existing plugins to send push notifications
to mobile devices.

##Configuration

###iOS
You need to pass a configuration object that contains the certificates and passphrase to work

```
import notification from 'mobilenotifications'
const conf = {
  ios: {
    cert: 'myCertificate.pem',
    key:  'myKey.pem',
    passphrase: 'myPassphrase'
  },
  android: {
  // TODO...
  }
}

const ios = notification('ios', conf.ios)
const android = notification('android', conf.android)
ios.send('deviceId', 'Message that will appear in user phone', {
  payload: 'the extra amount of data that you want to send'
})

android.send('deviceId', 'message...', { extra: 'data' })
```