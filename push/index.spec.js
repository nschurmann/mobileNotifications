import assert from 'assert'
import sinon from 'sinon'
import notification from './'
import { expect } from 'chai'

let serviceMock

describe('index', () => {

  beforeEach(() => {
    serviceMock = {
      ios: sinon.spy(),
      android: sinon.spy()
    }
    notification.__Rewire__('service', serviceMock)
  })

  describe('return services', () => {

    it('use ios if service requested is iOS', () => {
      const service = notification.getService({ service: 'ios' })
      assert(serviceMock.ios.calledOnce, 'ios service was not called.')
    })

    it('use android if service requested is android', () => {
      const service = notification.getService({ service: 'android' })
      assert(serviceMock.android.calledOnce, 'android service was not called.')
    })

    it('throw error on no service specified', () => {
      expect(x=>{
        notification.getService()
      }).to.throw('You need to pass some configuration')

    })

    it('returns error on no existing service', () => {
      expect(x => {
        notification.getService({ service: 'inexistent' })
      }).to.throw('The service does not exist')
    })
  })
})