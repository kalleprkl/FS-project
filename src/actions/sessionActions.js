import sessionService from '../services/sessions'
import { removeApiAction } from './apiActions'

const addSessionAction = (session) => {
    return {
        type: 'ADD_SESSION',
        payload: session
    }
}

export const initSession = () => {
    return async (dispatch) => {
        const foundSession = JSON.parse(window.localStorage.getItem(`rf-session`))
        let foundToken = ''
        if (foundSession) {
            foundToken = foundSession.token
        }
        try {
            const response = await sessionService.get(foundToken)
            console.log(response.status)
            const session = {
                token: response.token || foundToken,
                apis: response.apis
            }
            window.localStorage.setItem(`rf-session`, JSON.stringify(session))
            dispatch(addSessionAction(session))
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
            dispatch(addSessionAction(session))
        } catch (error) {
            console.log('logout error')
        }

    }
}







