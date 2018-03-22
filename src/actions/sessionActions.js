import sessionService from '../services/sessions'
import axios from 'axios'

const toInit = [
    {
        source: 'youtube',
        url: 'http://localhost:5000/yt'
    },
    /*{
        source: 'reddit',
        url: 'http://localhost:5000/r'
    }*/
]

export const initSession = () => {
    return async (dispatch) => {
        await Promise.all(toInit.map(async ({ source, url }) => {
            const session = await init(source, url)
            dispatch({
                type: 'ADD_SESSION',
                payload: session
            })
        }))
    }
}

const init = async (source, url) => {
    const foundToken = window.sessionStorage.getItem(`rf-${source}`)
    try {
        const response = await sessionService.get(url, foundToken)
        if (response.isActive) {
            return {
                source,
                token: foundToken
            }
        } else {
            const newToken = response.token
            window.sessionStorage.setItem(`rf-${source}`, newToken)
            return {
                source,
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





