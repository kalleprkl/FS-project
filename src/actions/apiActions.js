import apiService from '../services/apis'

const getId = () => (100000*Math.random()).toFixed(0)

export const initApi = (url, source) => {
    return async (dispatch) => {
        try {
            const content = await apiService.get(url)
            const items = content.map(object => {
                return {
                    id : getId(),
                    source,
                    object
                }    
            })
            dispatch({
                type: 'ENDPOINT_INIT',
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
    }
}