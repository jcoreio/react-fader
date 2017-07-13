import React from 'react'
import { storiesOf } from '@storybook/react'
import Prefixer from 'inline-style-prefixer'
import {TransitionListener} from 'react-transition-context'

import Fader from '../src'
import FaderWithTransitionContext from '../src/withTransitionContext'
import getNodeDimensions from 'get-node-dimensions'

/* eslint-env browser */

const smokeTestPages = [
  {
    height: 200,
    backgroundColor: 'red',
  },
  {
    height: 500,
    backgroundColor: 'blue',
  },
  {
    height: 80,
    backgroundColor: 'green',
  },
  {
    height: 2000,
    backgroundColor: 'yellow',
  },
  {
    height: 1000,
    backgroundColor: 'orange',
  },
]

const prefixer = new Prefixer()

const styles = {
  fillParent: {
    root: prefixer.prefix({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
    }),
    buttons: prefixer.prefix({
      flex: '0 0 auto',
    }),
    content: prefixer.prefix({
      position: 'relative',
      flex: '1 1 auto',
    }),
    info: prefixer.prefix({
      flex: '0 0 auto',
    }),
  },
}

class SmokeTest extends React.Component {
  state = {activePage: 0}
  inputRefs: Array<HTMLInputElement> = []

  pageDidComeIn = index => {
    if (this.inputRefs[index]) {
      this.inputRefs[index].focus()
      this.inputRefs[index].select()
    }
  }

  render(): React.Element<any> {
    const {fillParent, animateHeight, info} = this.props
    const {activePage} = this.state
    const FaderComp = this.props.Fader || Fader

    const pageStyle = this.props.margins
      ? {...smokeTestPages[activePage], marginTop: 20, paddingTop: 10, paddingBottom: 5, paddingLeft: 10, paddingRight: 10}
      : smokeTestPages[activePage]

    return (
      <div style={fillParent ? styles.fillParent.root : {}}>
        <div style={fillParent ? styles.fillParent.buttons : {}}>
          Jump to Page: {smokeTestPages.map((child, index) =>
            <button key={index} onClick={() => this.setState({activePage: index})}>{index}</button>
          )}
        </div>
        <div style={fillParent ? styles.fillParent.info : {}}>
          {info}
        </div>
        <div style={fillParent ? styles.fillParent.content : {}}>
          <FaderComp
              fillParent={fillParent}
              animateHeight={Boolean(animateHeight)}
              measureHeight={node => getNodeDimensions(node, {margin: true}).height}
          >
            <div key={activePage} style={pageStyle}>
              <h3 style={{marginTop: 0}}>Page {activePage}</h3>
              <input type="text" ref={c => this.inputRefs[activePage] = c} />
              {FaderComp === FaderWithTransitionContext &&
                <TransitionListener didComeIn={() => this.pageDidComeIn(activePage)} />
              }
            </div>
          </FaderComp>
          {!fillParent && <div style={{borderTop: '1px solid black'}}>
            This this the bottom of the Fader
          </div>}
        </div>
      </div>
    )
  }
}

storiesOf('react-fader', module)
  .add('with animateHeight', () => <SmokeTest animateHeight />)
  .add('without animateHeight', () => <SmokeTest />)
  .add('with fillParent', () => (
    <SmokeTest
        fillParent
        info={
          <h3><code>fillParent</code> causes <code>Fader</code> to use <code>position: absolute</code> to fill its parent.</h3>
        }
    />
  ))
  .add('with margins', () => (
    <SmokeTest
        animateHeight
        margins
        info={
          <h3 style={{marginBottom: 0}}>
            This example uses <code>get-node-dimensions</code> in <code>measureHeight</code> to handle margins properly with <code>animateHeight</code>.
          </h3>
        }
    />
  ))
  .add('withTransitionContext', () => (
    <SmokeTest
        Fader={FaderWithTransitionContext}
        info={
          <h3><code>withTransitionContext</code> makes it possible to focus an input after transitioning.</h3>
        }
    />
  ))
