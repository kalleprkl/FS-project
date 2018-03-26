import React, { Component } from 'react'
import { connect } from 'react-redux'

import { initApis } from './actions/apiActions'
import { initSession, endSession } from './actions/sessionActions'

import { Container, Grid, Rail, Segment, Menu } from 'semantic-ui-react'
import ItemContainer from './components/itemContainer'
import LeftMenu from './components/leftMenu'

class App extends Component {

  async componentDidMount() {
    await this.props.initSession()
    this.props.initApis(this.props.session)
  }

  render() {

    const fixed = {
      minWidth: 300,
      minHeight: 100,
    }

    return (
      <Container>
        <div style={fixed}></div>
        <Grid centered>
          <Segment>
            <Rail position='left'>
              <Segment>
                <LeftMenu/>
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
}

export default connect(mapStateToProps, mapActionToProps)(App)
