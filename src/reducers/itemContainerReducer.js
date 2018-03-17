const itemContainerReducer = (state = [], { type, payload }) => {
    switch (type) {
        case 'CONTAINER_ADD':
            return [...state, payload]
        case 'CONTAINER_DEL':
            return state.filter(item => item.id !== payload.id)
        case 'ADD_BUNCH':
            return [...state, ...payload]
        default:
            return state
    }
}

export default itemContainerReducer