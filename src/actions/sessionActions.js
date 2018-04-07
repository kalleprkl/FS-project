import sessionService from '../services/sessions'
import { initApis, removeApiAction } from './apiActions'

const setSessionAction = (session) => {
    return {
        type: 'SET_SESSION',
        payload: session
    }
}

export const initSession = () => {
    return async (dispatch) => {
        const foundSessionJSON = window.localStorage.getItem(`rf-session`)
        let foundToken = ''
        if (foundSessionJSON) {
            const foundSession = JSON.parse(foundSessionJSON)
            foundToken = foundSession.token
        }
        try {
            const response = await sessionService.get(foundToken)
            const session = {
                token: response.token || foundToken,
                apis: response.apis
            }
            window.localStorage.setItem(`rf-session`, JSON.stringify(session))
            dispatch(setSessionAction(session))
            dispatch(initApis())
        } catch (error) {
            console.log('session init failure')
        }

    }
}

export const endSession = (api) => {
    return async (dispatch, getState) => {
        dispatch(removeApiAction(api))
        try {
            const token = getState().session.token
            const response = await sessionService.logout(api, token)
            const session = {
                token: response.token || token,
                apis: response.apis
            }
            window.localStorage.setItem(`rf-session`, JSON.stringify(session))
            dispatch(setSessionAction(session))
        } catch (error) {
            console.log('logout error')
        }
    }
}








