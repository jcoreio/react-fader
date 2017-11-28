// @flow

import * as React from 'react'
import {createFader, defaultWrapChildren} from './index'
import TransitionContext from 'react-transition-context'

type TransitionState = 'in' | 'out' | 'entering' | 'leaving'

function wrapChildren(children: any, transitionState: TransitionState): React.Element<typeof TransitionContext> {
  return defaultWrapChildren.call(
    this,
    <TransitionContext transitionState={transitionState}>
      {children}
    </TransitionContext>,
    transitionState
  )
}

export default createFader({wrapChildren})

