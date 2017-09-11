import React from 'react'
import {findDOMNode} from 'react-dom'
import { storiesOf } from '@storybook/react'
import Prefixer from 'inline-style-prefixer'
import {TransitionListener} from 'react-transition-context'
import {Button, ButtonGroup, Panel, FormControl} from 'react-bootstrap'

import Fader from '../src'
import FaderWithTransitionContext from '../src/withTransitionContext'
import getNodeDimensions from 'get-node-dimensions'

import ReactRouterDemo from './ReactRouterDemo'

/* eslint-env browser */

const smokeTestPages = [
  {
    height: 200,
    backgroundColor: 'red',
    bsStyle: 'primary',
  },
  {
    height: 500,
    backgroundColor: 'blue',
    bsStyle: 'info',
  },
  {
    height: 100,
    backgroundColor: 'green',
    bsStyle: 'success',
  },
  {
    height: 2000,
    backgroundColor: 'yellow',
    bsStyle: 'warning',
  },
  {
    height: 1000,
    backgroundColor: 'orange',
    bsStyle: 'danger',
  },
]

const prefixer = new Prefixer()

const styles = {
  default: {
    root: prefixer.prefix({
      margin: 10,
    }),
    buttons: prefixer.prefix({
      marginBottom: 15,
    }),
  },
  fillParent: {
    root: prefixer.prefix({
      position: 'absolute',
      top: 10,
      left: 10,
      right: 10,
      bottom: 10,
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

    const {height} = smokeTestPages[activePage]
    const pageStyle = this.props.margins
      ? {height, marginTop: 20, marginLeft: 10, marginBottom: 20, marginRight: 10}
      : {height}

    return (
      <div style={fillParent ? styles.fillParent.root : styles.default.root}>
        <div style={fillParent ? styles.fillParent.buttons : styles.default.buttons}>
          Jump to Page: <ButtonGroup>{smokeTestPages.map((child, index) =>
            <Button bsStyle={activePage === index ? 'primary' : undefined} key={index} onClick={() => this.setState({activePage: index})}>{index}</Button>
          )}</ButtonGroup>
        </div>
        <div style={fillParent ? styles.fillParent.info : {}}>
          {info}
        </div>
        <div style={fillParent ? styles.fillParent.content : {}}>
          <FaderComp
              fillParent={fillParent}
              animateHeight={Boolean(animateHeight)}
              measureHeight={node => getNodeDimensions(findDOMNode(node), {margin: true}).height}
          >
            <Panel
                key={activePage}
                bsStyle={smokeTestPages[activePage].bsStyle}
                header={<h3>Page {activePage}</h3>}
                style={pageStyle}
            >
              <FormControl type="text" inputRef={c => this.inputRefs[activePage] = c} />
              {FaderComp === FaderWithTransitionContext &&
                <TransitionListener didComeIn={() => this.pageDidComeIn(activePage)} />
              }
            </Panel>
          </FaderComp>
          {!fillParent && <div style={{borderTop: '1px solid black', textAlign: 'center'}}>
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
  .add('with react-router v4', ReactRouterDemo)
