const sessionReducer = (state = '', { type, payload }) => {
    switch (type) {
        case 'ADD_SESSION':
            return payload
        case 'REMOVE_SESSION':
            return ''
        default:
            return state
    }
}

export default sessionReducer