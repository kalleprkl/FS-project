import React from 'react'
import { connect } from 'react-redux'
import { removeFromContainer } from '../actions/containerActions'
import Youtube from './youtube'

const ItemContainer = ({ itemContainer, removeFromContainer }) => {
    return (
        <div>
            {itemContainer.map(item => {
                return createItem(item)
            })}
        </div>
    )
}

const border = {
    border: 'solid',
    borderWidth: '1px'
}

const createItem = (item) => {
    switch (item.source) {
        case 'youtube':
            return <Youtube item={item} />
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
        itemContainer: state.itemContainer
    }
}

const mapActionToProps = {
    removeFromContainer
}

export default connect(mapStateToProps, mapActionToProps)(ItemContainer)