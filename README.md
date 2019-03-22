# react-fader

<<<<<<< HEAD
[![Build Status](https://travis-ci.org/jcoreio/react-fader.svg?branch=master)](https://travis-ci.org/jcoreio/react-fader)
[![Coverage Status](https://codecov.io/gh/jcoreio/react-fader/branch/master/graph/badge.svg)](https://codecov.io/gh/jcoreio/react-fader)
=======
[![CircleCI](https://circleci.com/gh/jedwards1211/react-karma-library-skeleton.svg?style=svg)](https://circleci.com/gh/jedwards1211/react-karma-library-skeleton)
[![Coverage Status](https://codecov.io/gh/jedwards1211/react-karma-library-skeleton/branch/master/graph/badge.svg)](https://codecov.io/gh/jedwards1211/react-karma-library-skeleton)
>>>>>>> bd321b17d93e21512aed627731d12d4564af5057
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/es2015-library-skeleton.svg)](https://badge.fury.io/js/es2015-library-skeleton)

<<<<<<< HEAD
A React Component that fades out its old child, then fades in its new child when its children change.
It can also optionally animate its height from one child's height to the other.
Works well with `react-router`!
=======
This is my personal skeleton for creating a React library npm package with Karma tests. You are welcome to use it.
>>>>>>> bd321b17d93e21512aed627731d12d4564af5057

## Usage

```sh
<<<<<<< HEAD
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

=======
npx 0-60 clone https://github.com/jedwards1211/react-karma-library-skeleton.git
```

## Tools used

- babel 7
- mocha
- chai
- eslint
- flow
- enzyme
- karma
- karma-webpack
- karma-coverage
- husky
- semantic-release
- renovate
- Circle CI
- Codecov.io
>>>>>>> bd321b17d93e21512aed627731d12d4564af5057
