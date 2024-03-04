/* eslint-env browser */
import * as React from 'react'
import { TransitionContext } from 'react-transition-context'
import Prefixer from 'inline-style-prefixer'
export type TransitionState = 'in' | 'out' | 'entering' | 'leaving'
export type DefaultProps = {
  fadeInTransitionDuration: number
  fadeInTransitionTimingFunction: string
  fadeOutTransitionDuration: number
  fadeOutTransitionTimingFunction: string
  sizeTransitionDuration: number
  sizeTransitionTimingFunction: string
  prefixer: Prefixer
  style: any
  shouldTransition: (oldChildren?: any, newChildren?: any) => boolean
}

export type Props = {
  animateHeight?: boolean | null | undefined
  animateWidth?: boolean | null | undefined
  innerRef?: (
    c?: React.ElementRef<'div'> | null | undefined
  ) => any | null | undefined
  shouldTransition?: (
    oldChildren?: any,
    newChildren?: any
  ) => boolean | null | undefined
  children?: React.ReactNode | null | undefined
  fadeInTransitionDuration?: number | null | undefined
  fadeInTransitionTimingFunction?: string | null | undefined
  fadeOutTransitionDuration?: number | null | undefined
  fadeOutTransitionTimingFunction?: string | null | undefined
  sizeTransitionDuration?: number | null | undefined
  sizeTransitionTimingFunction?: string | null | undefined
  prefixer?: Prefixer | null | undefined
  style?: any | null | undefined
  viewStyle?: any | null | undefined
  innerViewWrapperStyle?: any | null | undefined
  className?: string | null | undefined
}
export type DefaultedProps = {
  animateHeight?: boolean | null | undefined
  animateWidth?: boolean | null | undefined
  innerRef?: (c?: React.ElementRef<'div'> | null | undefined) => any
  shouldTransition: (oldChildren?: any, newChildren?: any) => boolean
  children?: React.ReactNode
  fadeInTransitionDuration: number
  fadeInTransitionTimingFunction: string
  fadeOutTransitionDuration: number
  fadeOutTransitionTimingFunction: string
  sizeTransitionDuration: number
  sizeTransitionTimingFunction: string
  prefixer: Prefixer
  style: any
  viewStyle?: any | null | undefined
  innerViewWrapperStyle?: any | null | undefined
  className?: string
}
const defaultProps: DefaultProps = {
  fadeInTransitionDuration: 200,
  fadeInTransitionTimingFunction: 'linear',
  fadeOutTransitionDuration: 200,
  fadeOutTransitionTimingFunction: 'linear',
  sizeTransitionDuration: 200,
  sizeTransitionTimingFunction: 'ease',
  prefixer: new Prefixer(),
  style: {},

  shouldTransition(oldChildren: any, newChildren: any): boolean {
    if (oldChildren === newChildren) return false
    if (
      React.isValidElement(oldChildren) &&
      React.isValidElement(newChildren) &&
      oldChildren.key != null &&
      oldChildren.key === newChildren.key
    ) {
      return false
    }
    return true
  },
}

function applyDefaults(props: Props): DefaultedProps {
  const result: any = { ...props }

  for (const key in defaultProps) {
    if (
      Object.prototype.hasOwnProperty.call(defaultProps, key) &&
      (props as any)[key] == null
    ) {
      result[key] = (defaultProps as any)[key]
    }
  }

  return result
}

export type State = {
  children: any
  height: number | null | undefined
  width: number | null | undefined
  wrappedChildren: React.ReactElement<any>
  transitionState: TransitionState
  transitioningSize: boolean
}
export default class Fader extends React.Component<Props, State> {
  lastProps: Props = this.props
  lastDefaultedProps: DefaultedProps | null | undefined
  getDefaultedProps = (): DefaultedProps => {
    if (this.lastProps !== this.props || !this.lastDefaultedProps) {
      this.lastProps = this.props
      this.lastDefaultedProps = applyDefaults(this.props)
    }
    return this.lastDefaultedProps
  }
  wrapChildren = (
    children: any,
    transitionState: TransitionState
  ): React.ReactElement<React.ComponentProps<'div'>> => {
    const {
      animateWidth,
      prefixer,
      viewStyle,
      innerViewWrapperStyle,
      fadeInTransitionDuration,
      fadeInTransitionTimingFunction,
      fadeOutTransitionDuration,
      fadeOutTransitionTimingFunction,
    } = this.getDefaultedProps()
    const style: any = {
      display: animateWidth ? 'inline-flex' : 'flex',
      transitionProperty: 'opacity',
      ...viewStyle,
    }

    switch (transitionState) {
      case 'out':
      case 'entering':
        style.opacity = transitionState === 'entering' ? 1 : 0
        style.transitionDuration = fadeInTransitionDuration + 'ms'
        style.transitionTimingFunction = fadeInTransitionTimingFunction
        break
      case 'in':
      case 'leaving':
        style.opacity = transitionState === 'in' ? 1 : 0
        style.transitionDuration = fadeOutTransitionDuration + 'ms'
        style.transitionTimingFunction = fadeOutTransitionTimingFunction
        break
    }

    return (
      <div
        data-transition-state={transitionState}
        style={prefixer.prefix(style)}
      >
        <div
          style={prefixer.prefix({
            width: animateWidth ? undefined : '100%',
            ...innerViewWrapperStyle,
          })}
          ref={(c) => (this.wrappedChildrenRef = c)}
        >
          <TransitionContext state={transitionState}>
            {children}
          </TransitionContext>
        </div>
      </div>
    )
  }
  wrappedChildrenRef: HTMLElement | null | undefined
  timeouts: {
    [name: string]: any
  } = {}
  state: State = {
    children: this.props.children,
    height: undefined,
    width: undefined,
    wrappedChildren: this.wrapChildren(this.props.children, 'in'),
    transitionState: 'in',
    transitioningSize: false,
  }

  setTimeout(name: string, callback: () => any, delay: number) {
    if (this.timeouts[name]) clearTimeout(this.timeouts[name])
    this.timeouts[name] = setTimeout(callback, delay)
  }

  componentDidUpdate() {
    const { transitionState, height, width, transitioningSize } = this.state
    const {
      animateHeight,
      animateWidth,
      shouldTransition: _shouldTransition,
      fadeOutTransitionDuration,
      fadeInTransitionDuration,
      sizeTransitionDuration,
    } = this.getDefaultedProps()

    const shouldTransition = _shouldTransition(
      this.state.children,
      this.props.children
    )

    if (transitionState === 'in' && shouldTransition) {
      const newState: Partial<State> = {}
      newState.children = this.props.children
      newState.transitionState = 'leaving'
      newState.wrappedChildren = this.wrapChildren(
        this.state.children,
        'leaving'
      )
      this.setTimeout(
        'fadeOut',
        this.onTransitionEnd,
        fadeOutTransitionDuration
      )

      if (animateHeight && height === undefined && this.wrappedChildrenRef) {
        newState.height = this.wrappedChildrenRef.clientHeight
      }

      if (animateWidth && width === undefined && this.wrappedChildrenRef) {
        newState.width = this.wrappedChildrenRef.clientWidth
      }

      this.setState((state) => ({ ...state, ...newState }))
    } else if (
      transitionState === 'leaving' &&
      (animateHeight || animateWidth)
    ) {
      if (!transitioningSize) this.setState({ transitioningSize: true })
    } else if (transitionState === 'out') {
      const newState: Partial<State> = {}

      if (shouldTransition) {
        newState.children = this.props.children
        newState.wrappedChildren = this.wrapChildren(this.props.children, 'out')
      } else {
        newState.transitionState = 'entering'
        newState.children = this.props.children
        newState.wrappedChildren = this.wrapChildren(
          this.props.children,
          'entering'
        )
        this.setTimeout(
          'fadeIn',
          this.onTransitionEnd,
          fadeInTransitionDuration
        )
        if (animateHeight) {
          if (this.wrappedChildrenRef) {
            newState.height = this.wrappedChildrenRef.clientHeight
          }
          this.setTimeout(
            'height',
            this.onSizeTransitionEnd,
            sizeTransitionDuration
          )
        }
        if (animateWidth) {
          if (this.wrappedChildrenRef) {
            newState.width = this.wrappedChildrenRef.clientWidth
          }
          this.setTimeout(
            'width',
            this.onSizeTransitionEnd,
            sizeTransitionDuration
          )
        }
      }

      this.setState((state) => ({ ...state, ...newState }))
    } else if (
      !shouldTransition &&
      this.state.children !== this.props.children
    ) {
      const newState: Partial<State> = {}
      newState.children = this.props.children
      newState.wrappedChildren = this.wrapChildren(
        this.props.children,
        transitionState
      )
      this.setState((state) => ({ ...state, ...newState }))
    }
  }

  onTransitionEnd = (e?: Event) => {
    const { shouldTransition, fadeOutTransitionDuration } =
      this.getDefaultedProps()
    const { transitionState } = this.state
    if (transitionState === 'leaving') {
      this.setState({
        transitionState: 'out',
        wrappedChildren: this.wrapChildren(this.props.children, 'out'),
      })
    } else if (transitionState === 'entering') {
      if (shouldTransition(this.state.children, this.props.children)) {
        this.setState({
          transitionState: 'leaving',
          wrappedChildren: this.wrapChildren(this.state.children, 'leaving'),
        })
        this.setTimeout(
          'fadeOut',
          this.onTransitionEnd,
          fadeOutTransitionDuration
        )
      } else {
        this.setState({
          transitionState: 'in',
          height: undefined,
          width: undefined,
          wrappedChildren: this.wrapChildren(this.props.children, 'in'),
        })
      }
    }
  }
  onSizeTransitionEnd = (e?: Event) => {
    this.setState({ transitioningSize: false })
  }

  componentWillUnmount() {
    for (const name in this.timeouts) clearTimeout(this.timeouts[name])
  }

  render(): React.ReactElement<React.ComponentProps<'div'>> {
    const { height, width, transitioningSize, wrappedChildren } = this.state
    const {
      animateWidth,
      className,
      prefixer,
      innerRef,
      style: _style,
      sizeTransitionDuration,
      sizeTransitionTimingFunction,
    } = this.getDefaultedProps()
    const style = {
      height,
      width,
      display: animateWidth ? 'inline-block' : 'block',
      ..._style,
    } as const

    if (transitioningSize) {
      style.overflow = 'hidden'
      style.transition = `height ${sizeTransitionDuration}ms ${sizeTransitionTimingFunction}, width ${sizeTransitionDuration}ms ${sizeTransitionTimingFunction}`
    }

    return (
      <div className={className} style={prefixer.prefix(style)} ref={innerRef}>
        {wrappedChildren}
      </div>
    )
  }
}
