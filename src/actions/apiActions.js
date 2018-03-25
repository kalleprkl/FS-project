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
            } catch (error) {
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

