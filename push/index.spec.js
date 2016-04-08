import assert from 'assert'
import sinon from 'sinon'
import notification from './'
import { expect } from 'chai'

let serviceMock, conf

describe('index', () => {

  beforeEach(() => {
    conf = {}
    serviceMock = {
      ios: sinon.spy(),
      android: sinon.spy()
    }
    notification.__Rewire__('services', serviceMock)
  })

  describe('return services', () => {

    it('use ios if service requested is iOS', () => {
      const service = notification.getService('ios', conf)
      assert(serviceMock.ios.calledOnce, 'ios service was not called.')
    })

    it('use android if service requested is android', () => {
      const service = notification.getService('android', conf)
      assert(serviceMock.android.calledOnce, 'android service was not called.')
    })

    it('throw error on no service specified', () => {
      expect(x=>{
        notification.getService()
      }).to.throw('You need to select a service')

    })

    it('returns error on no existing service', () => {
      expect(x => {
        notification.getService('inexistent', conf)
      }).to.throw('The service does not exist')
    })
  })
})