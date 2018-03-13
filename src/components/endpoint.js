import React from 'react'
import { connect } from 'react-redux'
import { addToContainer } from '../actions/containerActions'
import { Grid } from 'semantic-ui-react'


const Endpoint = ({ endpoint, addToContainer }) => {

    const handleClick = (item) => () => {
        addToContainer(item)
    }

    return (
        <Grid.Column width={4}>
            {'['}
            {endpoint.content.map(item => {
                return (
                    <div onClick={handleClick(item)}>
                        {'{'}
                        {Object.keys(item).map(key => 
                            <p>{`${key}: ${item[key]},`}</p>
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

const mapActionsToProps = {
    addToContainer: addToContainer
}

export default connect(null, mapActionsToProps)(Endpoint)
