import sessionService from '../services/sessions'

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

export const initSession = () => {
    return (dispatch) => {
        toInit.map(async ({ source, url }) => {
            const session = window.localStorage.getItem(`rf-${source}`)
            try {
                const response = await sessionService.get(url, session)
                if (response.session) {
                    dispatch({
                        type: 'ADD_SESSION',
                        payload: {
                            source,
                            session
                        }
                    })
                } else {
                    window.localStorage.setItem(`rf-${source}`, response.state)
                    dispatch({
                        type: 'ADD_SESSION',
                        payload: {
                            source,
                            session: response.state,
                            url: response.authUrl
                        }
                    })
                }
            } catch (error) {
                console.log('session init error')
            }
        })
    }
}





