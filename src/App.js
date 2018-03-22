import React, { Component } from 'react'
import { connect } from 'react-redux'

import { initApis } from './actions/apiActions'
import { initSession, endSession } from './actions/sessionActions'

import { Container, Grid, Rail, Segment } from 'semantic-ui-react'
import ItemContainer from './components/itemContainer'

class App extends Component {

  async componentDidMount() {
    await this.props.initSession()
    this.props.initApis(this.props.sessions)
  }

  logout = (session) => () => {
    this.props.endSession(session)
  }

  render() {
    
    const fixed = {
      minWidth: 300,
      minHeight: 100,
      //border: 'solid',
      //margin: 50
    }

    return (
      <Container>
        <div style={fixed}></div>
        <Grid></Grid>
        <Grid centered>
          <Segment>
            <Rail position='left'>
              <Segment>
                {this.props.sessions.map(session => session.authUrl ? <a href={session.authUrl}>{session.source}<br /></a> : <button onClick={this.logout(session)}>{`${session.source} logout`}<br /></button>)}
              </Segment>
            </Rail>
            <Grid.Column width={7} >
              <ItemContainer />
            </Grid.Column>
            <Rail position='right'>
              <Segment>
              </Segment>
            </Rail>
          </Segment>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sessions: state.sessions
  }
}

const mapActionToProps = {
  initApis,
  initSession,
  endSession
}

export default connect(mapStateToProps, mapActionToProps)(App)
