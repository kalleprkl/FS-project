import authLinkService from '../services/authLinks'

export const getAuthLink = (url, source) => {
    return async (dispatch) => {
        const response = await authLinkService.get(url)
        dispatch({
            type: 'ADD_AUTH_LINK',
            payload: {
                source,
                url: response
            }
        })
    }
}