import React from 'react'
import { connect } from 'react-redux'
import Youtube from './youtube'
import Reddit from './reddit'

const ItemContainer = ({ apis }) => {

    let container = []
    apis.map(api => container = [...container, ...api.items])
    
    return (
        <div style={{ minHeight: 500, minWidth: 500 }}>
            {container.length > 0 ?
                container.map(item => {
                    return createItem(item)}) 
                : 
                <div>give permits to fill feed</div>
            }
        </div>
    )
}

const border = {
    border: 'solid',
    borderWidth: '1px',
    maxWidth: 500,
    textAlign: 'left',
    fontSize: 'small'
    //margin: 20
}

const border2 = {
    border: 'solid',
    borderWidth: '1px',
    maxWidth: 700,
    textAlign: 'left',
    //margin: 20
}

const createItem = (item) => {
    switch (item.api) {
        case 'youtube':
            //return <Youtube key={item.id} item={item} />
            return <p key={item.id} style={border}>{item.object}</p>
        case 'reddit':
            return <Reddit key={item.id} item={item} />
        case 'facebook':
            return <p style={border}>facebook</p>
        default:
            return <p style={border2}></p>
    }
}

const mapStateToProps = (state) => {
    return {
        apis: state.apis
    }
}

const mapActionToProps = {}

export default connect(mapStateToProps, mapActionToProps)(ItemContainer)