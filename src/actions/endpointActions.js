import endpointService from '../services/endpoints'

const getId = () => (100000*Math.random()).toFixed(0)

export const initEndpoint = (url) => {
    return async (dispatch) => {
        try {
            const content = await endpointService.get(url)
            const items = content.map(object => {
                return {
                    id : getId(),
                    object
                }    
            })
            dispatch({
                type: 'ENDPOINT_INIT',
                payload: {
                    id: getId(),
                    url,
                    items
                }
            })
        } catch (exception) {   
            console.log('endpoint init failed')
        }
    }
}