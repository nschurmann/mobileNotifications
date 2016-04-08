import assert from 'assert'
import sinon from 'sinon'
import notification from './'
import { expect } from 'chai'

describe('notification', () => {

  beforeEach(() => {
    notification.__Rewire__('push', {getService: x=>x})
  })

  it('receive the configuration', () => {
    let configureSpy = sinon.spy(),
        obj = { configure: configureSpy },
        pushStub = { getService: x => obj }

    let getServiceSpy = sinon.spy(pushStub, 'getService')

    notification.__Rewire__('push', pushStub)
    notification({ service: 'ios' })

    assert(getServiceSpy.calledWith({ service: 'ios' }), 'getService did not received the service name')
    notification.__ResetDependency__('push')
  })

})