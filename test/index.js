import React from 'react'
import Fader from '../src'
import {mount} from 'enzyme'
import {expect} from 'chai'
import sinon from 'sinon'

describe('Fader', () => {
  let clock
  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })
  afterEach(() => {
    clock.restore()
  })

  it('single transition works', () => {
    const comp = mount(
      <Fader>
        <h3>Foo</h3>
      </Fader>
    )

    expect(comp.text()).to.equal('Foo')

    comp.setProps({children: <div><h3>Bar</h3></div>})

    expect(comp.text()).to.equal('Foo')
    clock.tick(1000)
    expect(comp.text()).to.equal('Bar')
  })
  it('multiple transitions work', () => {
    const comp = mount(
      <Fader>
        <h3>Foo</h3>
      </Fader>
    )

    expect(comp.text()).to.equal('Foo')

    comp.setProps({children: <div><h3>Bar</h3></div>})

    expect(comp.text()).to.equal('Foo')
    clock.tick(100)
    comp.setProps({children: <div><h3>Baz</h3></div>})
    clock.tick(400)
    expect(comp.text()).to.equal('Baz')
  })
})
