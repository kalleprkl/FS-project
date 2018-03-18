const authLinkReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case 'ADD_AUTH_LINK':
            let newObject = {}
            newObject[payload.source] = payload.url
            const newState = Object.assign({}, state, newObject)
            return newState
        default:
            return state
    }
}

export default authLinkReducer