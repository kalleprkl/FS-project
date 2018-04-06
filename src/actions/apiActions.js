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
        if (session) {
            const promises = session.apis.map(async ({ api }) => {
                try {
                    const data = await apiService.get(api, session.token)
                    const items = data.map(object => {
                        return {
                            id: getId(),
                            api,
                            object
                        }
                    })
                    dispatch(addApiAction({
                        api,
                        items
                    }))
                } catch (error) {
                    console.log('api init failed')
                }
            })
            await Promise.all(promises)
        } else {
            console.log('server unavailable')
        }
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

