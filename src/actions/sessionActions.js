import sessionService from '../services/sessions'

export const initSession = () => {
    return async (dispatch) => {
        const foundSession = JSON.parse(window.sessionStorage.getItem(`rf-session`))
        let foundToken = ''
        if (foundSession) {
            foundToken = foundSession.token
        }
        try {
            const response = await sessionService.get('http://localhost:5000/auth', foundToken)
            addSession(dispatch, response.apis, response.token || foundToken)
        } catch (error) {
            console.log('session init failure')
        }
    }
}

export const endSession = (api, token) => {
    return async (dispatch) => {
        window.sessionStorage.removeItem(`rf-session`)
        dispatch({
            type: 'REMOVE_SESSION',
            payload: api
        })
        dispatch({
            type: 'API_REMOVE',
            payload: api
        })
        try {
            const response = await sessionService.logout(api, token)
            addSession(dispatch, response.apis, response.token)
        } catch (error) {
            console.log('logout error')
        }

    }
}

const addSession = (dispatch, apis, token) => {
    const session = {
        token,
        apis
    }
    window.sessionStorage.setItem(`rf-session`, JSON.stringify(session))
    dispatch({
        type: 'ADD_SESSION',
        payload: session
    })
}







