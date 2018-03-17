import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addToContainer } from './actions/containerActions'
import { initEndpoint } from './actions/endpointActions'

import GoogleLogin from 'react-google-login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Grid, Image, Rail, Segment } from 'semantic-ui-react'
import ItemContainer from './components/itemContainer'

import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };
  }

  componentDidMount() {
    try {
      const initAuthPath = async () => {
        const response = await axios.get('http://localhost:5000/yt')
        this.setState({ url: response.data })
      }
      initAuthPath()
    } catch (exception) {
      //console.log(exception)
    }

    try {
      const initYoutube = async () => {
        const response = await axios.get('http://localhost:5000/yt/data')
        this.props.initEndpoint(response.data)
      }
      initYoutube()
    } catch (exception) {
      console.log('youtube init failed')
    }
  }

  render() {

    return (
      <Container>
        <Router>
          <Grid centered>
            <Segment>
              <Rail position='left'>
                <Segment>
                  <a href={this.state.url || ''} >youtube</a>
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
    endpoints: state.endpoints
  }
}

const mapActionToProps = {
  addToContainer,
  initEndpoint
}

export default connect(mapStateToProps, mapActionToProps)(App)
