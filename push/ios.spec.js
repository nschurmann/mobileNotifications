import assert from 'assert'
import sinon from 'sinon'
import { expect } from 'chai'

import Notification from './ios'

describe('ios Notification', () => {

  const conf = {
    cert: 'myCertificate',
    key:  'myKey',
  }

  let apnMock, spies, handleNoDeviceSpy

  beforeEach(() => {
    apnMock = {
      Feedback: x=>apnMock,
      on: x=>apnMock,
      Connection: x=>apnMock,
      Notification: x=>apnMock,
      setSound: x=>apnMock,
      setAlertText: x=>apnMock,
      setBadge: x=>apnMock,
    }
    spies = {
      Feedback: sinon.spy(apnMock, 'Feedback'),
      on: sinon.spy(apnMock, 'on'),
      Connection: sinon.spy(apnMock, 'Connection'),
      Notification: sinon.spy(apnMock, 'Notification'),
      setSound: sinon.spy(apnMock, 'setSound'),
      setAlertText: sinon.spy(apnMock, 'setAlertText'),
      setBadge: sinon.spy(apnMock, 'setBadge'),
    }

    Notification.__Rewire__('apn', apnMock)
    Notification.__Rewire__('handleNoDevice', handleNoDeviceSpy = sinon.spy())
  });

  describe('new instance', () => {

    it('reject the conf if no cert, key and passphrase is passed', () => {
      expect(x=>{
        let notification = new Notification({})
      }).to.throw('Must pass at least a cert and key')
    })

    it('merge defaults configuration on minimum configuration passed', () => {

      let notification = new Notification(conf)
      expect(notification.conf).to.deep.equal({
        cert: 'myCertificate',
        key: 'myKey',
        production: false,
        cacheLength: 100,
      })
    })

    it('gets a connection working', () => {
      let notification = new Notification(conf)
      expect(spies.Connection.calledWithNew(), 'Connection was not instantiated.').to.be.true
      expect(spies.Connection.calledWith({
        cert: 'myCertificate',
        key: 'myKey',
        production: false,
        cacheLength: 100,
      })).to.be.true
    })

    it('gets apple feedback running', () => {
      let notification = new Notification(conf)
      expect(spies.Feedback.calledWithNew(), '`Feedback` was not instantiated').to.be.true
      expect(spies.on.calledThrice, '`on` not called twice').to.be.true
      expect(spies.on.calledWith('feedbackError'), 'Feedback error not managed').to.be.true
      expect(spies.on.calledWith('feedback'), 'Feedback not managed').to.be.true
      expect(spies.on.calledWith('error'), 'Error not managed').to.be.true
    })

  })

  describe('send', () => {
    let notification
    beforeEach(() => {
      notification = new Notification(conf)
      notification.con.pushNotification = sinon.spy()
    })

    it('creates a new notification', () => {
      notification.send('device')
      expect(spies.Notification.calledWithNew(), '`Notification was not instantiated').to.be.true
    })

    it('handle no device', () => {
      notification.send()
      expect(handleNoDeviceSpy.calledOnce).to.be.true
      expect(notification.con.pushNotification.callCount == 0, 'notification should not be sent').to.be.true
    })

    it('sets default badges and sound', () => {
      notification.send('device', 'my message')
      expect(notification.con.pushNotification.calledWith(apnMock, 'device')).to.be.true
      expect(apnMock.sound == 'ping.aiff', 'sound was not set').to.be.true
      expect(apnMock.badge == undefined).to.be.true
      expect(apnMock.alert == 'my message', 'message was not set').to.be.true
    })

  })

})