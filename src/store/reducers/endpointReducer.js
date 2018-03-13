
const initialState = [
    {
        id: 1,
        url: 'http://',
        content: [
            'kissa',
            'koira'
        ]
    },
    {
        id: 2,
        url: 'http://',
        content: [
            'pelle',
            'vauva'
        ]
    }
]

const getId = () => (100000*Math.random()).toFixed(0)

const endpointReducer = (state = [], { type, payload }) => {
    switch (type) {
        case 'ENDPOINT_INIT':
            payload.id = getId()
            return [...state, payload]
        default:
            return state
    }
}

export default endpointReducer