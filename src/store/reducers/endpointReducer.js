
const endpointReducer = (state = [], { type, payload }) => {
    switch (type) {
        case 'ENDPOINT_INIT':
            return [...state, payload]
        default:
            return state
    }
}

export default endpointReducer