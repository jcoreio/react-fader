// @flow

import * as React from 'react'
import { render } from '@testing-library/react'
import { describe, it, beforeEach, afterEach } from 'mocha'
import Fader from '../src'
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

  it('single transition works', async () => {
    const comp = render(
      <Fader>
        <h3>Foo</h3>
      </Fader>
    )

    expect(comp.container.querySelector('h3')?.innerHTML).to.equal('Foo')

    comp.rerender(
      <Fader>
        <h3>Bar</h3>
      </Fader>
    )

    expect(comp.container.querySelector('h3')?.innerHTML).to.equal('Foo')
    await clock.tickAsync(1000)
    expect(comp.container.querySelector('h3')?.innerHTML).to.equal('Bar')
  })
  it('multiple transitions work', async () => {
    const comp = render(
      <Fader>
        <h3>Foo</h3>
      </Fader>
    )

    expect(comp.container.querySelector('h3')?.innerHTML).to.equal('Foo')

    comp.rerender(
      <Fader>
        <h3>Bar</h3>
      </Fader>
    )

    expect(comp.container.querySelector('h3')?.innerHTML).to.equal('Foo')
    await clock.tickAsync(100)
    comp.rerender(
      <Fader>
        <h3>Baz</h3>
      </Fader>
    )
    await clock.tickAsync(400)
    expect(comp.container.querySelector('h3')?.innerHTML).to.equal('Baz')
  })
  it('height animation works', async () => {
    let el, instance

    const comp = render(
      <Fader
        ref={(c) => (instance = c)}
        innerRef={(c) => (el = c)}
        animateHeight
      >
        <h3 key="foo" style={{ width: 500, height: 200 }}>
          Foo
        </h3>
      </Fader>
    )

    expect(comp.container.querySelector('h3')?.innerHTML).to.equal('Foo')
    expect(el.style.height).to.equal('')

    comp.rerender(
      <Fader
        ref={(c) => (instance = c)}
        innerRef={(c) => (el = c)}
        animateHeight
      >
        <h3 key="bar" style={{ height: 400 }}>
          Bar
        </h3>
      </Fader>
    )

    expect(comp.container.querySelector('h3')?.innerHTML).to.equal('Foo')
    expect(instance.state.height).to.equal(200)
    await clock.tickAsync(100)
    expect(instance.state.transitionState).to.equal('leaving')
    expect(instance.state.height).to.equal(200)
    await clock.tickAsync(200)
    expect(instance.state.transitionState).to.equal('entering')
    expect(instance.state.height).to.equal(400)
    await clock.tickAsync(500)
    expect(instance.state.transitionState).to.equal('in')
    expect(instance.state.height).to.equal(undefined)
  })
  it('width animation works', async () => {
    let el, instance

    const comp = render(
      <Fader
        ref={(c) => (instance = c)}
        innerRef={(c) => (el = c)}
        animateWidth
      >
        <h3 key="foo" style={{ height: 500, width: 200 }}>
          Foo
        </h3>
      </Fader>
    )

    expect(comp.container.querySelector('h3')?.innerHTML).to.equal('Foo')
    expect(el.style.width).to.equal('')

    comp.rerender(
      <Fader
        ref={(c) => (instance = c)}
        innerRef={(c) => (el = c)}
        animateWidth
      >
        <h3 key="bar" style={{ width: 400 }}>
          Bar
        </h3>
      </Fader>
    )

    expect(comp.container.querySelector('h3')?.innerHTML).to.equal('Foo')
    expect(instance.state.width).to.equal(200)
    await clock.tickAsync(100)
    expect(instance.state.transitionState).to.equal('leaving')
    expect(instance.state.width).to.equal(200)
    await clock.tickAsync(200)
    expect(instance.state.transitionState).to.equal('entering')
    expect(instance.state.width).to.equal(400)
    await clock.tickAsync(500)
    expect(instance.state.transitionState).to.equal('in')
    expect(instance.state.width).to.equal(undefined)
  })
})
