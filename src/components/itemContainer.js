import React from 'react'
import { connect } from 'react-redux'

const ItemContainer = ({ container }) => {
    return (
        <div>
            {'['}
            {container.map(item =>
                <div>
                    {'{'}
                    {Object.keys(item).map(key =>
                        <p>{`${key}: ${item[key]},`}</p>
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

export default connect(mapStateToProps)(ItemContainer)