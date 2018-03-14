import React from 'react'
import { connect } from 'react-redux'
import { addToContainer } from '../actions/containerActions'
import { Grid } from 'semantic-ui-react'


const Endpoint = ({ endpoint, addToContainer }) => {

    return (
        <Grid.Column color={'grey'}>
            {'['}
            {endpoint.items.map(item => {
                return (
                    <div onClick={() => addToContainer(item)} >
                        <pre>{JSON.stringify(item.object, null, 2)}</pre>
                    </div>
                )
            }
            )}
            {']'}
        </Grid.Column>
    )
}

/*const Endpoint = ({ endpoint, addToContainer }) => {

    return (
        <Grid.Column color={'grey'}>
            {'['}
            {endpoint.items.map(item => {
                return (
                    <div onClick={() => addToContainer(item)} >
                        {'{'}
                        {Object.keys(item.object).map(key =>
                            <p style={{ margin:1 }}>{`${key}: ${item.object[key]},`}</p>
                        )}
                        {'},'}
                    </div>
                )
            }
            )}
            {']'}
        </Grid.Column>
    )
}*/

const border = {
    borderStyle: 'dotted',
    borderWidth: '1px'
}

const mapActionToProps = {
    addToContainer: addToContainer
}

export default connect(null, mapActionToProps)(Endpoint)

