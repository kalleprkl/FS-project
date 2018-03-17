import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addToContainer } from './actions/containerActions'
import { initApi } from './actions/apiActions'
import { getAuthLink } from './actions/authLinkActions'

import GoogleLogin from 'react-google-login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Grid, Image, Rail, Segment } from 'semantic-ui-react'
import ItemContainer from './components/itemContainer'

import axios from 'axios'

class App extends Component {

  componentDidMount() {
    this.props.getAuthLink('http://localhost:5000/yt', 'youtube')
    this.props.initApi('http://localhost:5000/yt/data', 'youtube')
  }

  render() {

    return (
      <Container>
        <Router>
          <Grid centered>
            <Segment>
              <Rail position='left'>
                <Segment>
                  <a href={this.props.authLinks.youtube || ''} >youtube</a>
                </Segment>
              </Rail>
              <Grid.Column width={7} >
                <ItemContainer />
              </Grid.Column>
              <Rail position='right'>
                <Segment>Right Rail Content</Segment>
              </Rail>
            </Segment>
          </Grid>
        </Router>
      </Container>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    authLinks: state.authLinks
  }
}

const mapActionToProps = {
  addToContainer,
  initApi,
  getAuthLink
}

export default connect(mapStateToProps, mapActionToProps)(App)
