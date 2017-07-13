# react-fader

[![Build Status](https://travis-ci.org/jcoreio/react-fader.svg?branch=master)](https://travis-ci.org/jcoreio/react-fader)
[![Coverage Status](https://coveralls.io/repos/github/jcoreio/react-fader/badge.svg?branch=master)](https://coveralls.io/github/jcoreio/react-fader?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A React Component that fades out old children, then fades in new children when its children change.
It can also optionally animate its height from one child's height to the other.

:sparkles: **If you're using `react-router` v2 or v3, make it the component of a parent route, and voilà, you
automagically get fade transitions between child routes.**

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

```js
import Fader from 'react-fader/lib/withTransitionContext'
```

This works exactly like `Fader` except that it renders its children within a `TransitionContext` component from
`react-transition-context` with the given `transitionState`.  This is useful for doing things like focusing an `<input>`
element after the children have transitioned in.

