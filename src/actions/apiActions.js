import apiService from '../services/apis'

const getId = () => (100000*Math.random()).toFixed(0)

export const initApi = (source, content) => {
    return async (dispatch) => {
        try {
            //const content = await endpointService.get(url)
            const items = content.map(object => {
                return {
                    id : getId(),
                    source: 'youtube',
                    object
                }    
            })
            //console.log(items)
            dispatch({
                type: 'ENDPOINT_INIT',
                payload: {
                    id: getId(),
                    url: '',
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