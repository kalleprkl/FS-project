const sessionReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case 'ADD':
            return Object.assign({}, state, payload)
        case 'REMOVE':
        default:
            return state
    }
}

export default sessionReducer