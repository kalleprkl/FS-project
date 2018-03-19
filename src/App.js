import React, { Component } from 'react'
import { connect } from 'react-redux'

import { initApis } from './actions/apiActions'
import { initAuthLinks } from './actions/authLinkActions'

import { BrowserRouter as Router } from 'react-router-dom'
import { Container, Grid, Rail, Segment } from 'semantic-ui-react'
import ItemContainer from './components/itemContainer'

import axios from 'axios'

class App extends Component {

  componentDidMount() {
    this.props.initAuthLinks()
    this.props.initApis()
  }

  handleClick = async () => {
    const response = await axios.get('http://localhost:5000/yt/fart')
    console.log(response)
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
                <br />
                <a href={this.props.authLinks.reddit} >reddit</a>
              </Segment>
            </Rail>
            <Grid.Column textAlign='justified' width={7} >
              <ItemContainer />
            </Grid.Column>
            <Rail position='right'>
              <Segment>
                <button onClick={this.handleClick}>click</button>
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
    authLinks: state.authLinks
  }
}

const mapActionToProps = {
  initAuthLinks,
  initApis
}

export default connect(mapStateToProps, mapActionToProps)(App)
