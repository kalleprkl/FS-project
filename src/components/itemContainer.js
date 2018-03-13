import React from 'react'
import { connect } from 'react-redux'
import { removeFromContainer } from '../actions/containerActions'

const ItemContainer = ({ container, removeFromContainer }) => {

    return (
        <div>
            {'['}
            {container.map(item =>
                <div onClick={() => removeFromContainer(item)}>
                    {'{'}
                    {Object.keys(item.object).map(key =>
                        <p>{`${key}: ${item.object[key]},`}</p>
                    )}
                    {'},'}
                </div>
            )}
            {']'}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        container: state.container
    }
}

const mapActionToProps = {
    removeFromContainer
}

export default connect(mapStateToProps, mapActionToProps)(ItemContainer)