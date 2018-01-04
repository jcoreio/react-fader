// @flow

import {describe, it, beforeEach, afterEach} from 'mocha'
import * as React from 'react'
import Fader from '../src'
import {mount} from 'enzyme'
import {configure as configureEnzyme} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configureEnzyme({ adapter: new Adapter() })
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

    comp.unmount()
  })
  it('works with fillParent', () => {
    let element
    const comp = mount(
      <Fader fillParent innerRef={c => element = c}>
        <h3>Foo</h3>
      </Fader>
    )

    if (!element) throw new Error('expected element to be defined')

    expect(comp.text()).to.equal('Foo')
    const {style} = element
    expect(style.position).to.equal('absolute')
    expect(style.top).to.equal('0px')
    expect(style.left).to.equal('0px')
    expect(style.right).to.equal('0px')
    expect(style.bottom).to.equal('0px')

    comp.setProps({children: <div><h3>Bar</h3></div>})

    expect(comp.text()).to.equal('Foo')
    clock.tick(1000)
    expect(comp.text()).to.equal('Bar')

    comp.unmount()
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

    comp.unmount()
  })
  it('height animation works', () => {
    let instance

    const comp = mount(
      <Fader innerRef={c => instance = c} animateHeight>
        <div style={{width: 500, height: 200}}>Foo</div>
      </Fader>,
      {attachTo: document.getElementById('root')}
    )

    if (!instance) throw new Error('expected instance to be defined')

    expect(comp.text()).to.equal('Foo')
    expect(instance.getBoundingClientRect().height).to.equal(200)
    expect(instance.style.height).to.equal('')

    comp.setProps({children: <div style={{height: 400}} ref={c => instance = c}>Bar</div>})

    expect(comp.text()).to.equal('Foo')
    expect(instance.style.height).to.equal('200px')
    clock.tick(100)
    expect(comp.state('transitionState')).to.equal('leaving')
    expect(instance.style.height).to.equal('200px')
    clock.tick(200)
    expect(comp.state('transitionState')).to.equal('entering')
    expect(instance.style.height).to.equal('400px')
    clock.tick(500)
    expect(comp.state('transitionState')).to.equal('in')
    expect(comp.state('height')).to.equal(undefined)
    expect(instance.style.height).to.equal('')

    comp.unmount()
  })
})
