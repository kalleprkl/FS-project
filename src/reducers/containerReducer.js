
const initialState = [
    {},
    {
        source: 'youtube',
        url: 'https://www.youtube.com/embed/Kc2kFk5M9x4'
    },
    {
        source: 'reddit'
    },
    {
        source: 'facebook'
    },
    {},{}
]

const containerReducer = (state = [], { type, payload }) => {
    switch (type) {
        case 'CONTAINER_ADD':
            return [...state, payload]
        case 'CONTAINER_DEL':
            return state.filter(item => item.id !== payload.id)
        case 'ADD_BUNCH':
            return payload
        default:
            return state
    }
}

export default containerReducer