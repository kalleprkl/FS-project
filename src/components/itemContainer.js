import React from 'react'
import { connect } from 'react-redux'
//import Youtube from './youtube'
//import Reddit from './reddit'
import { Feed } from 'semantic-ui-react'

const ItemContainer = ({ session, apis }) => {

    const dimensions = { minHeight: 500, minWidth: 500, maxWidth: 500 }

    if (!session) {
        return (
            <Feed style={dimensions}>
                service unavailable
            </Feed>
        )
    }

    if (apis.length === 0) {
        return (
            <Feed style={dimensions}>
                give permissions to fill feed
            </Feed>
        )
    }

    let container = []
    apis.map(api => container = [...container, ...api.items])

    return (
        <Feed style={dimensions}>
            {container.map(item => {
                return createItem(item)
            })}
        </Feed>
    )
}

const createItem = (item) => {
    switch (item.api) {
        case 'youtube':
            return <Feed.Event key={item.id}><Feed.Content>{item.object}</Feed.Content></Feed.Event>
        case 'reddit':
            return <Feed.Event key={item.id}><Feed.Content>{item.object.data.title}</Feed.Content></Feed.Event>
        default:
            return <Feed.Event key={Math.random()}><Feed.Content>unknown</Feed.Content></Feed.Event>
    }
}

const mapStateToProps = (state) => {
    return {
        session: state.session,
        apis: state.apis
    }
}

export default connect(mapStateToProps)(ItemContainer)