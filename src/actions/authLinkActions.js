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
                const session = window.localStorage.getItem(`rf-${source}`)
                console.log(session)
                const response = await authLinkService.get(url, session)
                if (!response.session) {
                    window.localStorage.setItem(`rf-${source}`, response.state)
                    dispatch({
                        type: 'ADD_AUTH_LINK',
                        payload: {
                            source,
                            url: response.authUrl
                        }
                    })
                } 
            } catch (exception) {
                console.log('error while initializing links')
                console.log(exception)
            }
        })
    }
}



