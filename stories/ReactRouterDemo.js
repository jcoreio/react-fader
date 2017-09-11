import React from 'react'
import {findDOMNode} from 'react-dom'
import {HashRouter as Router, Route} from 'react-router-dom'
import Switch from 'react-router-transition-switch'
import Fader from '../src/withTransitionContext'
import {TransitionListener} from 'react-transition-context'
import {Panel, Form, FormGroup, ControlLabel, FormControl, Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import getNodeDimensions from 'get-node-dimensions'

const margin = 10

const measureHeight = node => {
  node = findDOMNode(node)
  if (!node) return 0
  return getNodeDimensions(node, {margin: true}).height
}

const HeightFader = props => <Fader {...props} measureHeight={measureHeight} />

const Home = () => (
  <Panel header={<h3>Home</h3>}>
    This is a demo of <code>react-router</code> v4 working with <code>react-fader</code>.
  </Panel>
)

const About = () => (
  <Panel bsStyle="info" header={<h3>About</h3>}>
    <p>Using <code>react-fader</code> with <code>react-router</code> is really easy.</p>
  </Panel>
)

class Profile extends React.Component {
  handleDidComeIn = () => {
    if (this.input) {
      this.input.focus()
      this.input.select()
    }
  }
  render() {
    return (
      <Panel header={<h4>Profile</h4>}>
        <Form>
          <FormGroup>
            <ControlLabel>First name</ControlLabel>
            <FormControl type="text" defaultValue="Andy" inputRef={c => this.input = c} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Last name</ControlLabel>
            <FormControl type="text" defaultValue="Edwards" />
          </FormGroup>
        </Form>

        <TransitionListener didComeIn={this.handleDidComeIn} />
      </Panel>
    )
  }
}

class ChangePassword extends React.Component {
  handleDidComeIn = () => {
    if (this.input) {
      this.input.focus()
      this.input.select()
    }
  }
  render() {
    return (
      <Panel header={<h4>Change Password</h4>}>
        <Form>
          <FormGroup>
            <ControlLabel>Old Password</ControlLabel>
            <FormControl type="password" inputRef={c => this.input = c} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>New Password</ControlLabel>
            <FormControl type="password" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Retype Password</ControlLabel>
            <FormControl type="password" />
          </FormGroup>
        </Form>
        <TransitionListener didComeIn={this.handleDidComeIn} />
      </Panel>
    )
  }
}

const Account = ({match, location}) => (
  <Panel header={<h3>Account</h3>}>
    <Nav bsStyle="pills" style={{marginBottom: margin}}>
      <LinkContainer to={`${match.url}/profile`}>
        <NavItem>Profile</NavItem>
      </LinkContainer>
      <LinkContainer to={`${match.url}/changePassword`}>
        <NavItem>Change Password</NavItem>
      </LinkContainer>
    </Nav>
    <Switch component={HeightFader}>
      <Route path={`${match.url}/profile`} component={Profile} />
      <Route path={`${match.url}/changePassword`} component={ChangePassword} />
    </Switch>
  </Panel>
)

const ReactRouterDemo = () => (
  <Router>
    <Route render={({match, location}) => (
      <div style={{margin}}>
        <Nav bsStyle="pills" style={{marginBottom: margin}}>
          <LinkContainer exact to="/">
            <NavItem>Home</NavItem>
          </LinkContainer>
          <LinkContainer to="/about">
            <NavItem>About</NavItem>
          </LinkContainer>
          <LinkContainer to="/account">
            <NavItem>Account</NavItem>
          </LinkContainer>
        </Nav>
        <Switch component={Fader}>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/account" component={Account} />
        </Switch>
      </div>
    )}
    />
  </Router>
)

export default ReactRouterDemo

