import React from 'react'
import { connect } from 'react-redux'
import { removeFromContainer } from '../actions/containerActions'

const ItemContainer = ({ container, removeFromContainer }) => {

    return (
        <div>
            {container.map(item => {
                return createItem(item)
            })}
        </div>
    )
}

const border = {
    border: 'solid',
    borderWidth: '1px'
}

const player = (item) => {
    return (
        <div style={{ margin: 20 }}>
            <iframe
                id='player'
                position='fixed'
                width="480"
                height="270"
                id="player"
                type="text/html"
                src={item.url}
                frameborder="0"
            ></iframe>
        </div>
    )
}

const createItem = (item) => {
    switch (item.source) {
        case 'youtube':
            return player(item)
        case 'facebook':
            return <p style={border}>facebook</p>
        case 'reddit':
            return <p style={border}>reddit</p>
        default:
            return <p style={border}>emptiness..</p>
    }
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