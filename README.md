# react-fader

[![Build Status](https://travis-ci.org/jcoreio/react-fader.svg?branch=master)](https://travis-ci.org/jcoreio/react-fader)
[![Coverage Status](https://coveralls.io/repos/github/jcoreio/react-fader/badge.svg?branch=master)](https://coveralls.io/github/jcoreio/react-fader?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A React Component that fades out its old child, then fades in its new child when its children change.
It can also optionally animate its height from one child's height to the other.
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

## Transitioning between child routes with `react-router` version 2 or 3

Use [`react-router-fader`](https://github.com/jcoreio/react-router-fader), which builds off of this.

## Props

##### `animateHeight: boolean` (default: `true`)

If truthy and `fillParent` is falsy, `Fader` will animate its height to match the height of its children.

##### `measureHeight: (node: HTMLElement) => number` (default: `node => node.offsetHeight`)

Allows you to override the height measurement function used for `animateHeight`.  For instance, you might want to use:
```js
import getNodeDimensions from 'get-node-dimensions'

<Fader measureHeight={node => getNodeDimensions(node, {margin: true}).height} ...>
  ...
</Fader>
```

##### `shouldTransition: (oldChildren: any, newChildren: any) => boolean` (default: compares keys)

Allows you to determine whether `Fader` should perform a transition from `oldChildren` to `newChildren`.  By default,
it returns true if `oldChildren !== newChildren` or their keys are not equal.

##### `fadeOutTransitionDuration: number` (default: `200`)

The duration of the fade out transition, in milliseconds.

##### `fadeOutTransitionTimingFunction: string` (default: `'ease'`)

The timing function for the fade out transition.

##### `fadeInTransitionDuration: number` (default: `200`)

The duration of the fade in transition, in milliseconds.

##### `fadeInTransitionTimingFunction: string` (default: `'ease'`)

The timing function for the fade in transition.

##### `heightTransitionDuration: number` (default: `200`)

The duration of the height transition, in milliseconds.

##### `heightTransitionTimingFunction: string` (default: `'ease'`)

The timing function for the height transition.

##### `prefixer: Prefixer`

If given, overrides the `inline-style-prefixer` used to autoprefix inline styles.

##### `fillParent: boolean` (default: `false`)

If truthy, `Fader` will use absolute positioning to fill its parent element.

##### `className: string`

Any extra class names to add to the root element.

##### `style: Object`

Extra inline styles to add to the root element.

## `withTransitionContext`

```sh
npm install --save react-fader react-transition-context
```
```js
import Fader from 'react-fader/lib/withTransitionContext'
```

This works exactly like `Fader` except that it renders its children within a `TransitionContext` component from
`react-transition-context` with the given `transitionState`.  This is useful for doing things like focusing an `<input>`
element after the children have transitioned in.

