import React from 'react'
import { connect } from 'react-redux'
import GridColumn, { Grid } from 'semantic-ui-react'
import Endpoint from './endpoint'

const xEndpointContainer = ({ endpoints }) => {
    return (
        <Grid celled>
            <Grid.Row>
                {endpoints.map(e => 
                    <Grid.Column key={e.id}>
                        <Endpoint endpoint={e} />
                    </Grid.Column>
                )}
            </Grid.Row>
        </Grid>
    )
}

const EndpointContainer = ({ endpoints }) => {
    return (
        <div>
                {endpoints.map(e => 
                    <Grid.Column key={e.id}>
                        <Endpoint endpoint={e} />
                    </Grid.Column>
                )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        endpoints: state.endpoints
    }
}

export default connect(mapStateToProps)(EndpointContainer)