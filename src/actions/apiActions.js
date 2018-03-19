import apiService from '../services/apis'

const toInit = [
    {
        source: 'youtube',
        url: 'http://localhost:5000/yt/data'
    },
    {
        source: 'reddit',
        url: 'http://localhost:5000/r/data'
    }
]



export const initApis = () => {
    return (dispatch) => {
        toInit.map(async ({ source, url }) => {
            try {
                const content = await apiService.get(url)
                const items = content.map(object => {
                    return {
                        id: getId(),
                        source,
                        object
                    }
                })
                dispatch({
                    type: 'API_INIT',
                    payload: {
                        id: getId(),
                        source,
                        items
                    }
                })
                dispatch({
                    type: 'ADD_BUNCH',
                    payload: items
                })
            } catch (exception) {
                console.log('api init failed')
            }
        })
    }
}

const ids = []

const getId = () => {
    let id = (100000 * Math.random()).toFixed(0)
    while (ids.includes(id)) {
        id = (100000 * Math.random()).toFixed(0)
    }
    ids.push(id)
    return id
}

