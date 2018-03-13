import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addToContainer } from './actions/containerActions'
import { initEndpoint } from './actions/endpointActions'

import { Container, Grid } from 'semantic-ui-react'
import ItemContainer from './components/itemContainer'
import Endpoint from './components/endpoint'

class App extends Component {

  componentDidMount() {
    this.props.initEndpoint('https://jsonplaceholder.typicode.com/posts')
    this.props.initEndpoint('https://jsonplaceholder.typicode.com/comments')
    this.props.initEndpoint('https://jsonplaceholder.typicode.com/users')
  }

  render() {
    return (
      <Container>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={4}>
              <ItemContainer />
            </Grid.Column>
            {this.props.endpoints.map(e =>
                <Endpoint endpoint={e} />
            )}
          </Grid.Row>
        </Grid>
      </Container>
    );
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
