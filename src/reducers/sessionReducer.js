const sessionReducer = (state = [], { type, payload }) => {
    switch (type) {
        case 'ADD_SESSION':
            return [...state, payload]
        case 'REMOVE_SESSION':
        default:
            return state
    }
}

export default sessionReducer