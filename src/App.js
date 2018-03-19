import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addToContainer } from './actions/containerActions'
import { initApi } from './actions/apiActions'
import { getAuthLink } from './actions/authLinkActions'

import { BrowserRouter as Router } from 'react-router-dom'
import { Container, Grid, Rail, Segment } from 'semantic-ui-react'
import ItemContainer from './components/itemContainer'

import axios from 'axios'

let url = ''

class App extends Component {

  componentDidMount() {
    try {
      const getRedditAuth = async () => {
        const response = await axios.get('http://localhost:5000/r')
        url = response.data 
      }
      getRedditAuth()
    } catch (exception) {

    }
    try {
      const getRedditData = async () => {
        const response = await axios.get('http://localhost:5000/r/data')
        console.log(response.data)
        url = response.data 
      }
      getRedditData()
    } catch (exception) {

    }
    this.props.getAuthLink('http://localhost:5000/yt', 'youtube')
    this.props.initApi('http://localhost:5000/yt/data', 'youtube')
  }

  render() {

    const fixed = {
      minWidth:300, 
      minHeight: 100
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
                <a href={url} >reddit</a>
              </Segment>
            </Rail>
            <Grid.Column width={7} >
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

/*const redditWidget = () => {
  const script = document.createElement("script")
  script.src = "https://www.reddit.com/hot/.embed?limit=5&t=all"
  script.type = "text/javascript"
  script.async = true
  document.getElementById('reddit').appendChild(script)
}*/

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
