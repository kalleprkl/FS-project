import apiService from '../services/apis'

export const initApis = (session) => {
    return (dispatch) => {
        session.apis.map(async ({ api }) => {
            try {
                const data = await apiService.get(`http://localhost:5000/data/${api}`, session.token)
                const items = data.map(object => {
                    return {
                        id: getId(),
                        api,
                        object
                    }
                })
                dispatch({
                    type: 'API_INIT',
                    payload: {
                        api,
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
        })
    }
}

export const initApis2 = (sessions) => {
    return (dispatch) => {
        sessions.map(async ({ source, token, dataUrl, authUrl }) => {
            if (!authUrl) {
                try {
                    const content = await apiService.get(dataUrl, token)
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

const ids = []

const getId = () => {
    let id = (100000 * Math.random()).toFixed(0)
    while (ids.includes(id)) {
        id = (100000 * Math.random()).toFixed(0)
    }
    ids.push(id)
    return id
}

