import React from 'react'
import { connect } from 'react-redux'
import { addToContainer } from '../actions/containerActions'
import { Grid } from 'semantic-ui-react'


const Endpoint = ({ endpoint, addToContainer }) => {

    return (
        <Grid.Column width={4}>
            {'['}
            {endpoint.items.map(item => {
                return (
                    <div onClick={() => addToContainer(item)}>
                        {'{'}
                        {Object.keys(item.object).map(key =>
                            <p>{`${key}: ${item.object[key]},`}</p>
                        )}
                        {'},'}
                    </div>
                )
            }
            )}
            {']'}
        </Grid.Column>
    )
}

const mapActionToProps = {
    addToContainer: addToContainer
}

export default connect(null, mapActionToProps)(Endpoint)
