/* @flow */
/* eslint-env browser */

import React, {Component} from 'react'
import Prefixer from 'inline-style-prefixer'
import getNodeDimensions from 'get-node-dimensions'

type TransitionState = 'in' | 'out' | 'entering' | 'leaving'

export type DefaultProps = {
  fadeInTransitionDuration: number,
  fadeInTransitionTimingFunction: string,
  fadeOutTransitionDuration: number,
  fadeOutTransitionTimingFunction: string,
  heightTransitionDuration: number,
  heightTransitionTimingFunction: string,
  prefixer: Prefixer,
  style: Object,
}

export type Props = {
  children?: any,
  animateHeight?: boolean,
  fadeInTransitionDuration: number,
  fadeInTransitionTimingFunction: string,
  fadeOutTransitionDuration: number,
  fadeOutTransitionTimingFunction: string,
  heightTransitionDuration: number,
  heightTransitionTimingFunction: string,
  prefixer: Prefixer,
  style: Object,
  fillParent?: boolean,
  className?: string,
}

export type State = {
  children: any,
  height: ?number,
  wrappedChildren: React.Element<any>,
  transitionState: TransitionState,
  transitioningHeight: boolean,
}

function measureHeight(node: ?HTMLElement): ?number {
  if (!node) return null
  return getNodeDimensions(node, {margin: true}).height
}

export type Options = {
  wrapChildren?: (children: any, transitionState: TransitionState) => React.Element<any>,
}

export function defaultWrapChildren(children: any, transitionState: TransitionState): React.Element<any> {
  const {prefixer, fillParent} = this.props
  const style: Object = {transitionProperty: 'opacity'}
  if (fillParent) {
    style.position = 'absolute'
    style.top = 0
    style.left = 0
    style.right = 0
    style.bottom = 0
    style.overflow = 'auto'
  }
  switch (transitionState) {
  case 'out':
  case 'entering':
    style.opacity = transitionState === 'entering' ? 1 : 0
    style.transitionDuration = this.props.fadeInTransitionTimingFunction + 'ms'
    style.transitionTimingFunction = this.props.fadeInTransitionTimingFunction
    break
  case 'in':
  case 'leaving':
    style.opacity = transitionState === 'in' ? 1 : 0
    style.transitionDuration = this.props.fadeOutTransitionDuration + 'ms'
    style.transitionTimingFunction = this.props.fadeOutTransitionTimingFunction
    break
  }
  return (
    <div
        ref={c => this.wrappedChildrenRef = c}
        data-transition-state={transitionState}
        style={prefixer.prefix(style)}
    >
      {children}
    </div>
  )
}

export function createFader(options: Options = {}): Class<Component<DefaultProps, Props, State>> {
  return class Fader extends Component<DefaultProps, Props, State> {
    static defaultProps = {
      fadeInTransitionDuration: 200,
      fadeInTransitionTimingFunction: 'linear',
      fadeOutTransitionDuration: 200,
      fadeOutTransitionTimingFunction: 'linear',
      heightTransitionDuration: 200,
      heightTransitionTimingFunction: 'ease',
      prefixer: new Prefixer(),
      style: {},
    }

    wrappedChildrenRef: ?HTMLElement
    timeouts: { [name: string]: number } = {}

    wrapChildren: (children: any, transitionState: TransitionState) => React.Element<any> =
      (options.wrapChildren || defaultWrapChildren).bind(this)

    state: State = {
      children: this.props.children,
      height: undefined,
      wrappedChildren: this.wrapChildren(this.props.children, 'in'),
      transitionState: 'in',
      transitioningHeight: false,
    }

    setTimeout(name: string, callback: () => any, delay: number) {
      if (this.timeouts[name]) clearTimeout(this.timeouts[name])
      this.timeouts[name] = setTimeout(callback, delay)
    }

    componentDidUpdate() {
      const {transitionState, height, transitioningHeight} = this.state
      const {animateHeight, fillParent} = this.props
      if (transitionState === 'in' && this.props.children !== this.state.children) {
        const newState: $Shape<State> = {}
        newState.children = this.props.children
        newState.transitionState = 'leaving'
        newState.wrappedChildren = this.wrapChildren(this.state.children, 'leaving')
        this.setTimeout('fadeOut', this.onTransitionEnd, this.props.fadeOutTransitionDuration)
        if (animateHeight && !fillParent) {
          if (height === undefined) newState.height = measureHeight(this.wrappedChildrenRef)
          else if (!transitioningHeight) newState.transitioningHeight = true
        }
        this.setState(newState)
      } else if (transitionState === 'out') {
        const newState: $Shape<State> = {}
        if (this.state.children === this.props.children) {
          newState.transitionState = 'entering'
          newState.wrappedChildren = this.wrapChildren(this.props.children, 'entering')
          this.setTimeout('fadeIn', this.onTransitionEnd, this.props.fadeInTransitionDuration)
          if (animateHeight && !fillParent) {
            newState.height = measureHeight(this.wrappedChildrenRef)
            this.setTimeout('height', this.onHeightTransitionEnd, this.props.heightTransitionDuration)
          }
        } else {
          newState.children = this.props.children
          newState.wrappedChildren = this.wrapChildren(this.props.children, 'out')
        }
        this.setState(newState)
      }
    }

    onTransitionEnd = (e?: Event) => {
      const {transitionState} = this.state
      if (transitionState === 'leaving') {
        this.setState({
          transitionState: 'out',
          wrappedChildren: this.wrapChildren(this.props.children, 'out'),
        })
      } else if (transitionState === 'entering') {
        if (this.props.children === this.state.children) {
          this.setState({
            transitionState: 'in',
            wrappedChildren: this.wrapChildren(this.props.children, 'in'),
          })
        } else {
          this.setState({
            transitionState: 'leaving',
            wrappedChildren: this.wrapChildren(this.state.children, 'leaving'),
          })
          this.setTimeout('fadeOut', this.onTransitionEnd, this.props.fadeOutTransitionDuration)
        }
      }
    }
    onHeightTransitionEnd = (e?: Event) => {
      this.setState({transitioningHeight: false})
    }

    componentWillUnmount() {
      for (let name in this.timeouts) clearTimeout(this.timeouts[name])
    }

    render(): React.Element<any> {
      const {height, transitioningHeight, wrappedChildren} = this.state
      const {className, prefixer, fillParent} = this.props
      const style = {...this.props.style}
      if (height != null) style.height = height
      if (transitioningHeight) {
        style.transitionProperty = 'height'
        style.transitionDuration = this.props.heightTransitionDuration + 'ms'
        style.transitionTimingFunction = this.props.heightTransitionTimingFunction
      }
      if (fillParent) {
        style.position = 'absolute'
        style.top = 0
        style.left = 0
        style.right = 0
        style.bottom = 0
      }
      return (
        <div className={className} style={prefixer.prefix(style)}>
          {wrappedChildren}
        </div>
      )
    }
  }
}

export default createFader()

