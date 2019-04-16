# react-fader

[![CircleCI](https://circleci.com/gh/jcoreio/react-fader.svg?style=svg)](https://circleci.com/gh/jcoreio/react-fader)
[![Coverage Status](https://codecov.io/gh/jcoreio/react-fader/branch/master/graph/badge.svg)](https://codecov.io/gh/jcoreio/react-fader)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/react-fader.svg)](https://badge.fury.io/js/react-fader)

A React Component that fades out its old child, then fades in its new child when its children change.
It can also optionally animate its height and/or width from one child's size to the other.
Works well with `react-router`!

## Usage

```sh
npm install --save react-fader
```

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Fader from 'react-fader'

ReactDOM.render(
  <Fader>
    <h3>Foo</h3>
  </Fader>,
  document.getElementById('root')
)

// Just change its children to something !==, and it will perform a fade transition.

ReactDOM.render(
  <Fader>
    <h3>Bar</h3>
  </Fader>,
  document.getElementById('root')
)
```

## Transitioning between child routes with `react-router` version 4

While it can be done with `<Switch>`, I recommend using
[`react-router-transition-switch`](https://github.com/jcoreio/react-router-transition-switch) instead:

```js
import {Route, BrowserRouter as Router} from 'react-router-dom'
import TransitionSwitch from 'react-router-transition-switch'
import Fader from 'react-fader'

<Router>
  <TransitionSwitch component={Fader}>
    <Route path="/red" component={Red}/>
    <Route path="/green" component={Green} />
    <Route path="/blue" component={Blue} />
  </TransitionSwitch>
<Router>
```

## Props

##### `animateHeight: boolean` (default: `true`)

If truthy, `Fader` will animate its height to match the height of its children.

##### `animateWidth: boolean` (default: `true`)

If truthy, `Fader` will animate its width to match the height of its children.

##### `shouldTransition: (oldChildren: any, newChildren: any) => boolean` (default: compares keys)

Allows you to determine whether `Fader` should perform a transition from `oldChildren` to `newChildren`. By default,
it returns true if `oldChildren !== newChildren` or their keys are not equal.

##### `fadeOutTransitionDuration: number` (default: `200`)

The duration of the fade out transition, in milliseconds.

##### `fadeOutTransitionTimingFunction: string` (default: `'ease'`)

The timing function for the fade out transition.

##### `fadeInTransitionDuration: number` (default: `200`)

The duration of the fade in transition, in milliseconds.

##### `fadeInTransitionTimingFunction: string` (default: `'ease'`)

The timing function for the fade in transition.

##### `sizeTransitionDuration: number` (default: `200`)

The duration of the size transition, in milliseconds.

##### `sizeTransitionTimingFunction: string` (default: `'ease'`)

The timing function for the size transition.

##### `prefixer: Prefixer`

If given, overrides the `inline-style-prefixer` used to autoprefix inline styles.

##### `className: string`

Any extra class names to add to the root element.

##### `style: Object`

Extra inline styles to add to the root element.
