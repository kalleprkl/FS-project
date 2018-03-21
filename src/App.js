import React, { Component } from 'react'
import { connect } from 'react-redux'

import { initApis } from './actions/apiActions'
import { initSession, endSession } from './actions/sessionActions'

import { BrowserRouter as Router } from 'react-router-dom'
import { Container, Grid, Rail, Segment } from 'semantic-ui-react'
import ItemContainer from './components/itemContainer'

import axios from 'axios'

class App extends Component {

  async componentDidMount() {
    //console.log('APPdidmount', window.localStorage.getItem(`rf-reddit`))
    await this.props.initSession()
    this.props.initApis(this.props.sessions)
  }

  logout = (session) => () => {
    console.log('APP', session)
    this.props.endSession(session)
    //console.log('APPlogout', window.localStorage.getItem(`rf-${session.source}}`))
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
                {/*Object.keys(this.props.authLinks).map(source => <a href={this.props.authLinks[source]} >{source}</a>)*/}
                {this.props.sessions.map(session => session.url ? <a href={session.url}>{session.source}<br /></a> : <button onClick={this.logout(session)}>{`${session.source} logout`}<br /></button>)}
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
