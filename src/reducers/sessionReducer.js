const sessionReducer = (state = '', { type, payload }) => {
    switch (type) {
        case 'ADD_SESSION':
            return payload
        default:
            return state
    }
}

export default sessionReducer