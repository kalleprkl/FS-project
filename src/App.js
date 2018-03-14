import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addToContainer } from './actions/containerActions'
import { initEndpoint } from './actions/endpointActions'

import { Container, Grid, Image, Rail, Segment  } from 'semantic-ui-react'
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
          <Grid.Row columns={this.props.endpoints.length + 1}>
            <Grid.Column color={'black'}>
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

/*const App = () => (
  <div>
    <pre>kuninkaallista     olla naapurissa</pre>
    <pre>     laitapuolella</pre>
    <pre>kahvia</pre>
  </div>
)*/

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo. Eu augue ut lectus arcu bibendum at varius. Bibendum at varius vel pharetra vel. Augue mauris augue neque gravida in fermentum et. Libero justo laoreet sit amet cursus sit amet dictum sit. Ut lectus arcu bibendum at varius vel pharetra. Eu scelerisque felis imperdiet proin fermentum. Maecenas sed enim ut sem. Turpis in eu mi bibendum neque egestas congue quisque egestas. Augue ut lectus arcu bibendum at. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Purus sit amet luctus venenatis. Id porta nibh venenatis cras sed felis. Fermentum posuere urna nec tincidunt praesent semper. Est ullamcorper eget nulla facilisi etiam. Duis convallis convallis tellus id interdum velit laoreet id donec. Non consectetur a erat nam at lectus.'
'Dui accumsan sit amet nulla facilisi morbi tempus. Elit at imperdiet dui accumsan sit amet nulla. Et odio pellentesque diam volutpat commodo sed egestas. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Nunc id cursus metus aliquam eleifend mi in. Quam nulla porttitor massa id neque aliquam vestibulum. At elementum eu facilisis sed odio morbi. Mattis ullamcorper velit sed ullamcorper morbi. Dolor sit amet consectetur adipiscing. Amet justo donec enim diam vulputate ut pharetra sit amet. Est lorem ipsum dolor sit amet consectetur. Tincidunt vitae semper quis lectus nulla at volutpat diam.'

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
