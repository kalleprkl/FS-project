import React from 'react'
import { connect } from 'react-redux'
import GridColumn, { Grid } from 'semantic-ui-react'
import Endpoint from './endpoint'

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