import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initSession } from './actions/sessionActions'
import { Container, Grid, Rail, Segment } from 'semantic-ui-react'
import ItemContainer from './components/itemContainer'
import LeftMenu from './components/leftMenu'

class App extends Component {

  componentDidMount() {
    this.props.initSession()
  }

  render() {
    const fixed = {
      minWidth: 300,
      minHeight: 100
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

const mapActionToProps = {
  initSession
}

export default connect(null, mapActionToProps)(App)
