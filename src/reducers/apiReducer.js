
const apiReducer = (state = [], { type, payload }) => {
    switch (type) {
        case 'API_INIT':
            return [...state, payload]
        case 'API_REMOVE':
            return state.filter(api => api.api !== payload)
        default:
            return state
    }
}

export default apiReducer