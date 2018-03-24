import sessionService from '../services/sessions'

const toInit = [
    {
        source: 'youtube',
        url: 'http://localhost:5000/yt',
        dataUrl: 'http://localhost:5000/yt/data'
    },
    {
        source: 'reddit',
        url: 'http://localhost:5000/r',
        dataUrl: 'http://localhost:5000/r/data'
    }
]

export const initSession = () => {
    return async (dispatch) => {
        await Promise.all(toInit.map(async api => {
            const session = await initOne(api)
            dispatch({
                type: 'ADD_SESSION',
                payload: session
            })
        }))
    }
}


const initOne = async ({ source, url, dataUrl }) => {
    const foundToken = window.sessionStorage.getItem(`rf-${source}`)
    await sessionService.get('http://localhost:5000/auth', foundToken)
    try {
        const response = await sessionService.get(url, foundToken)
        if (response.isActive) {
            return {
                source,
                dataUrl,
                token: foundToken
            }
        } else {
            const newToken = response.token
            window.sessionStorage.setItem(`rf-${source}`, newToken)
            return {
                source,
                dataUrl,
                token: newToken,
                authUrl: response.authUrl
            }
        }
    } catch (error) {
        console.log('session init failure')
    }
}

export const endSession = ({ source, token }) => {
    return async (dispatch) => {
        window.sessionStorage.removeItem(`rf-${source}}`)
        dispatch({
            type: 'REMOVE_SESSION',
            payload: source
        })
        dispatch({
            type: 'CONTAINER_DEL',
            payload: source
        })
        try {
            const response = await sessionService.logout(source, token)
            const newToken = response.token
            window.sessionStorage.setItem(`rf-${source}`, newToken)
            dispatch({
                type: 'ADD_SESSION',
                payload: {
                    source,
                    token: newToken,
                    authUrl: response.authUrl
                }
            })
        } catch (error) {
            console.log('logout error')
        }

    }
}





