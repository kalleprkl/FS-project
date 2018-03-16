import endpointService from '../services/endpoints'

const getId = () => (100000*Math.random()).toFixed(0)

export const initEndpoint = (content) => {
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
                    source: 'youtube',
                    items
                }
            })
            dispatch({
                type: 'ADD_BUNCH',
                payload: items
            })
        } catch (exception) {   
            console.log('endpoint init failed')
        }
    }
}