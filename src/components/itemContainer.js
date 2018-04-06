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

const createItem = (item) => {
    switch (item.api) {
        case 'youtube':
            //return <Youtube key={item.id} item={item} />
            return <p key={item.id} style={border}>{item.object}</p>
        case 'reddit':
            return <Reddit key={item.id} item={item} />
        default:
            return <p key={Math.random()} style={border2}>unknown</p>
    }
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

const mapStateToProps = (state) => {
    return {
        apis: state.apis
    }
}

export default connect(mapStateToProps)(ItemContainer)