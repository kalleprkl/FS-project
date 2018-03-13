import endpointService from '../services/endpoints'

const getId = () => (100000*Math.random()).toFixed(0)

export const initEndpoint = (url) => {
    return async (dispatch) => {
        try {
            const content = await endpointService.get(url)
            
            dispatch({
                type: 'ENDPOINT_INIT',
                payload: {
                    url,
                    content: content.map(item => item.id = getId())
                }
            })
        } catch (exception) {   
            console.log('endpoint init failed')
        }
    }
}