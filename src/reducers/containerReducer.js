
const containerReducer = (state = [], { type, payload }) => {
    switch (type) {
        case 'CONTAINER_ADD':
            return [...state, payload]
        case 'CONTAINER_DEL':
            return state.filter(item => item.id !== payload.id)
        default:
            return state
    }
}

export default containerReducer