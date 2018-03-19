import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addToContainer } from './actions/containerActions'
import { initApi } from './actions/apiActions'
import { getAuthLink } from './actions/authLinkActions'

import { BrowserRouter as Router } from 'react-router-dom'
import { Container, Grid, Rail, Segment } from 'semantic-ui-react'
import ItemContainer from './components/itemContainer'

import axios from 'axios'

class App extends Component {

  componentDidMount() {
    this.props.getAuthLink('http://localhost:5000/yt', 'youtube')
    this.props.getAuthLink('http://localhost:5000/r', 'reddit')
    this.props.initApi('http://localhost:5000/yt/data', 'youtube')
    this.props.initApi('http://localhost:5000/r/data', 'reddit')
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
                <a href={this.props.authLinks.youtube || ''} >youtube</a>
                <br/>
                <a href={this.props.authLinks.reddit} >reddit</a>
              </Segment>
            </Rail>
            <Grid.Column textAlign='justified' width={7} >
              <ItemContainer />
            </Grid.Column>
            <Rail position='right'>
              <Segment></Segment>
            </Rail>
          </Segment>
        </Grid>
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
