
const apiReducer = (state = [], { type, payload }) => {
    switch (type) {
        case 'ADD_API':
            return [...state, payload]
        case 'REMOVE_API':
            return state.filter(api => api.api !== payload)
        default:
            return state
    }
}

export default apiReducer