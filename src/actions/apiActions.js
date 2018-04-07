import apiService from '../services/apis'

const addApiAction = (api) => {
    return {
        type: 'ADD_API',
        payload: api
    }
}

export const removeApiAction = (api) => {
    return {
        type: 'REMOVE_API',
        payload: api
    }
}

export const initApis = () => {
    return async (dispatch, getState) => {
        const { session } = getState()
        if (!session) {
            return
        }
        const promises = session.apis.map(async api => {
            if (api.authUrl) {
                return
            }
            try {
                const data = await apiService.get(api.api, session.token)
                const items = data.map(object => {
                    return {
                        id: getId(),
                        api: api.api,
                        object
                    }
                })
                dispatch(addApiAction({
                    api: api.api,
                    items
                }))
            } catch (error) {
                console.log('api init failed')
            }

        })
        await Promise.all(promises)
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

