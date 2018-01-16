// @flow

import * as React from 'react'
import {mount} from 'enzyme'
import {expect} from 'chai'

import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Hello from '../src/index'

configure({ adapter: new Adapter() })

describe('test setup', () => {
  it('works', () => {
    const comp = mount(<Hello />)
    expect(comp.text()).to.equal('Hello world!')
  })
})
