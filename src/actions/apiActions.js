import apiService from '../services/apis'

const endpoints = {
    youtube: 'http://localhost:5000/yt/data',
    reddit: 'http://localhost:5000/r/data'
}

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

export const initApis = (sessions) => {
    return (dispatch) => {
        sessions.map(async ({ source, session, url }) => {
            if (!url) {
                try {
                    const content = await apiService.get(endpoints[source], session)
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
                } catch (error) {
                    console.log('api init failed')
                }
            }
        })
    }
}

export const initApis2 = () => {
    return (dispatch) => {
        toInit.map(async ({ source, url }) => {
            try {
                const content = await apiService.get(url, window.localStorage.getItem(`rf-${source}`))
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

