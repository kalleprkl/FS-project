import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addToContainer } from './actions/containerActions'
import { initEndpoint } from './actions/endpointActions'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Grid, Image, Rail, Segment, a } from 'semantic-ui-react'
import ItemContainer from './components/itemContainer'
import Endpoint from './components/endpoint'

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
      const init = async () => {
        const url = await axios.get('http://localhost:5000/yt')
        this.setState({ url: url.data })
        console.log(url)
        //const data = await axios.get('http://localhost:5000/yt/data')
        //this.props.initEndpoint(data.data)
      }
      init()
    } catch (exception) {

    }
  }

  youtubeInit = () => {
    console.log('INIT')
  }

  render() {

    return (
      <Container>
        <Router>
          <Grid centered>
            <Segment>
              <Rail position='left'>
                <Segment>
                  <button onClick={this.youtubeInit}>
                    <a href={this.state.url || ''} style={{ display: 'block', height: '100%' }} >youtube</a>
                  </button>
                  <button onClick={this.youtubeInit}>
                    <Link to={this.state.url || ''} style={{ display: 'block', height: '100%' }}></Link>
                  </button>
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

    /*<Container>
        <Grid centered columns={3}>
          <Grid.Column>
            <Segment width={1}>
              <Rail position='left'>
                <Segment>Left Rail Content</Segment>
              </Rail>
              <Grid.Column width={6} >
                <ItemContainer />
              </Grid.Column>
              <Rail position='right'>
                <Segment>Right Rail Content</Segment>
              </Rail>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>*/
  }
}

const RailExampleRail = () => (
  <Grid centered columns={3}>
    <Grid.Column>
      <Segment>
        <Image src='/assets/images/wireframe/paragraph.png' />

        <Rail position='left'>
          <Segment>Left Rail Content</Segment>
        </Rail>

        <Rail position='right'>
          <Segment>Right Rail Content</Segment>
        </Rail>
      </Segment>
    </Grid.Column>
  </Grid>
)

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
