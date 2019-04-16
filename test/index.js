// @flow

import * as React from 'react'
import Fader from '../src'
import { mount } from 'enzyme'
import { configure as configureEnzyme } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configureEnzyme({ adapter: new Adapter() })
import { expect } from 'chai'
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

    comp
      .setProps({
        children: (
          <div>
            <h3>Bar</h3>
          </div>
        ),
      })
      .update()

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

    comp
      .setProps({
        children: (
          <div>
            <h3>Bar</h3>
          </div>
        ),
      })
      .update()

    expect(comp.text()).to.equal('Foo')
    clock.tick(100)
    comp
      .setProps({
        children: (
          <div>
            <h3>Baz</h3>
          </div>
        ),
      })
      .update()
    clock.tick(400)
    expect(comp.text()).to.equal('Baz')

    comp.unmount()
  })
  it('height animation works', () => {
    let instance

    const rootElement = document.getElementById('root')
    if (rootElement == null) throw new Error("couldn't find root element")
    const comp = mount(
      <Fader innerRef={c => (instance = c)} animateHeight>
        <div key="foo" style={{ width: 500, height: 200 }}>
          Foo
        </div>
      </Fader>,
      { attachTo: rootElement }
    )

    if (!instance) throw new Error('expected instance to be defined')

    expect(comp.text()).to.equal('Foo')
    expect(instance.getBoundingClientRect().height).to.equal(200)
    expect(instance.style.height).to.equal('')

    comp
      .setProps({
        children: (
          <div key="bar" style={{ height: 400 }} ref={c => (instance = c)}>
            Bar
          </div>
        ),
      })
      .update()

    expect(comp.text()).to.equal('Foo')
    expect(comp.state('height')).to.equal(200)
    clock.tick(100)
    expect(comp.state('transitionState')).to.equal('leaving')
    expect(comp.state('height')).to.equal(200)
    clock.tick(200)
    expect(comp.state('transitionState')).to.equal('entering')
    expect(comp.state('height')).to.equal(400)
    clock.tick(500)
    expect(comp.state('transitionState')).to.equal('in')
    expect(comp.state('height')).to.equal(undefined)

    comp.unmount()
  })
  it('width animation works', () => {
    let instance

    const rootElement = document.getElementById('root')
    if (rootElement == null) throw new Error("couldn't find root element")
    const comp = mount(
      <Fader innerRef={c => (instance = c)} animateWidth>
        <div key="foo" style={{ height: 500, width: 200 }}>
          Foo
        </div>
      </Fader>,
      { attachTo: rootElement }
    )

    if (!instance) throw new Error('expected instance to be defined')

    expect(comp.text()).to.equal('Foo')
    expect(instance.getBoundingClientRect().width).to.equal(200)
    expect(instance.style.width).to.equal('')

    comp
      .setProps({
        children: (
          <div key="bar" style={{ width: 400 }} ref={c => (instance = c)}>
            Bar
          </div>
        ),
      })
      .update()

    expect(comp.text()).to.equal('Foo')
    expect(comp.state('width')).to.equal(200)
    clock.tick(100)
    expect(comp.state('transitionState')).to.equal('leaving')
    expect(comp.state('width')).to.equal(200)
    clock.tick(200)
    expect(comp.state('transitionState')).to.equal('entering')
    expect(comp.state('width')).to.equal(400)
    clock.tick(500)
    expect(comp.state('transitionState')).to.equal('in')
    expect(comp.state('width')).to.equal(undefined)

    comp.unmount()
  })
})
