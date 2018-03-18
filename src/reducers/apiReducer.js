
const apitReducer = (state = [], { type, payload }) => {
    switch (type) {
        case 'API_INIT':
            return [...state, payload]
        default:
            return state
    }
}

export default apitReducer