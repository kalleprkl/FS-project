import React, { Component } from 'react'
import { connect } from 'react-redux'

import { initApis } from './actions/apiActions'
import { initSession, endSession } from './actions/sessionActions'

import { Container, Grid, Rail, Segment } from 'semantic-ui-react'
import ItemContainer from './components/itemContainer'

class App extends Component {

  async componentDidMount() {
    await this.props.initSession()
    this.props.initApis(this.props.session)
  }

  logout = (api) => () => {
    this.props.endSession(api)
  }

  render() {

    const fixed = {
      minWidth: 300,
      minHeight: 100,
    }

    const links = () => {
      if (this.props.session) {
        const component = this.props.session.apis.map(api => {
          if (api.authUrl) {
            return <a href={api.authUrl}>{api.api}<br /></a>
          } else {
            return <button onClick={this.logout(api.api)}>{`${api.api} logout`}<br /></button>
          }
        })
        return component
      }
    }

    return (
      <Container>
        <div style={fixed}></div>
        <Grid centered>
          <Segment>
            <Rail position='left'>
              <Segment>
                {links()}
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
    session: state.session
  }
}

const mapActionToProps = {
  initApis,
  initSession,
  endSession
}

export default connect(mapStateToProps, mapActionToProps)(App)
