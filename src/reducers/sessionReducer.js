const sessionReducer = (state = '', { type, payload }) => {
    switch (type) {
        case 'SET_SESSION':
            return payload
        default:
            return state
    }
}

export default sessionReducer