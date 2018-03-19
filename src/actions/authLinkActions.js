import authLinkService from '../services/authLinks'

const toInit = [
    {
        source: 'youtube',
        url: 'http://localhost:5000/yt'
    },
    {
        source: 'reddit',
        url: 'http://localhost:5000/r'
    }
]

export const initAuthLinks = () => {
    return (dispatch) => {
        toInit.map(async ({ source, url }) => {
            try {
                const response = await authLinkService.get(url)
                dispatch({
                    type: 'ADD_AUTH_LINK',
                    payload: {
                        source,
                        url: response
                    }
                })
            } catch (exception) {
                console.log('error while initializing links')
            }
        })
    }
}



